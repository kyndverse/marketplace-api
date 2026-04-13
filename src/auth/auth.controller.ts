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
import type { JwtPayload, RequestWithGoogleUser } from './model/auth.model';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { GoogleOauthGuard } from './guard/google-oauth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: JwtPayload) {
    return { data: user };
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
