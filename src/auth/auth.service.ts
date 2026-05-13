import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/features/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/generated/prisma/client';
import { GoogleUser } from './model/auth.model';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      return {
        userId: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      };
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: registerDto.email },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException('Email has already exist');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        fullname: registerDto.fullname,
        email: registerDto.email,
        password: hashedPassword,
      },
    });

    return {
      data: {
        id: newUser.id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    };
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.usersService.getUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Email or password is wrong');
    }

    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      user.password!,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Email or password is wrong');
    }

    const payload = {
      sub: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    };

    return {
      data: {
        user: {
          id: payload.sub,
          fullname: payload.fullname,
          email: payload.email,
          role: payload.role,
        },
        access_token: await this.jwtService.signAsync(payload),
      },
    };
  }

  async generateAuthToken(user: User) {
    const payload = {
      sub: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

  async validateOAuthUser(googleUser: GoogleUser) {
    let user = await this.usersService.getUserByEmail(googleUser.email);

    if (!user) {
      user = await this.usersService.create({
        email: googleUser.email,
        fullname: `${googleUser.firstName} ${googleUser.lastName}`,
        role: 'CUSTOMER',
      });
    }

    return user;
  }
}
