import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfile } from './dto/update-user-dto';
import { ApiResponse } from 'src/model/response.model';
import { UserUpdateResponse } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        fullname: createUserDto.fullname,
        role: createUserDto.role,
      },
    });

    return newUser;
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user;
  }

  async updateById(
    updateUserDto: UpdateProfile,
    currentUserId: string,
  ): Promise<ApiResponse<UserUpdateResponse>> {
    const updated = await this.prismaService.user.update({
      where: { id: currentUserId },
      data: updateUserDto,
      select: { fullname: true, phoneNumber: true, address: true },
    });

    return {
      data: updated,
    };
  }
}
