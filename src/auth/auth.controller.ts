import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import type { RequestWithGoogleUser } from './model/auth.model';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { GoogleOauthGuard } from './guard/google-oauth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Message } from 'src/common/decorators/message.decorator';
import { ApiResponse } from 'src/model/response.model';
import { User } from 'src/features/users/model/user.model';
import { UsersService } from 'src/features/users/users.service';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  @Message('Register Succesfully!')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Message('SignIn Succesfully!')
  login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(
    @CurrentUser('sub') currentUserid: string,
  ): Promise<ApiResponse<User>> {
    return this.userService.getUserById(currentUserid);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    // Redirect ke halaman login resmi milik Google.
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  @Redirect()
  async googleAuthRedirect(@Request() req: RequestWithGoogleUser) {
    const user = await this.authService.validateOAuthUser(req.user);

    const access_token = await this.authService.generateAuthToken(user);

    return {
      url: `http://localhost:3000/dashboard?token=${access_token}`,
    };
  }
}
