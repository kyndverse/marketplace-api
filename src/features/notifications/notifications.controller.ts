import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiResponse } from 'src/model/response.model';
import { Notification } from './model/notifications.model';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Message } from 'src/common/decorators/message.decorator';

@UseGuards(JwtAuthGuard)
@Controller('/api/notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  getAllNotification(
    @CurrentUser('sub') currentUserId: string,
  ): Promise<ApiResponse<Notification[]>> {
    return this.notificationsService.getAllNotifications(currentUserId);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  sendNotification(
    @Body() dto: CreateNotificationDto,
  ): Promise<ApiResponse<Notification>> {
    return this.notificationsService.sendNotification(dto);
  }

  @Patch('read-all')
  @Message('Read all notification successfully!')
  readAllNotification(
    @CurrentUser('sub') currentUserId: string,
  ): Promise<ApiResponse<null>> {
    return this.notificationsService.readAllNotification(currentUserId);
  }

  @Patch(':id/read')
  updateReadNotification(
    @Param('id') id: string,
  ): Promise<ApiResponse<Notification>> {
    return this.notificationsService.updateIsRead(id);
  }
}
