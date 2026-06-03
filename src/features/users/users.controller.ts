import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateProfile } from './dto/update-user-dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiResponse } from 'src/model/response.model';
import { UserUpdateResponse } from './model/user.model';

@UseGuards(JwtAuthGuard)
@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  updateProfile(
    @Body() updateProfileDto: UpdateProfile,
    @CurrentUser('sub') currentUserId: string,
  ): Promise<ApiResponse<UserUpdateResponse>> {
    return this.usersService.updateById(updateProfileDto, currentUserId);
  }
}
