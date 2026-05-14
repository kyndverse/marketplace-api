import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ApiResponse } from 'src/model/response.model';
import { Notification } from './model/notifications.model';

@Injectable()
export class NotificationsService {
  constructor(private prismaService: PrismaService) {}

  async getAllNotifications(
    currentUserId: string,
  ): Promise<ApiResponse<Notification[]>> {
    const notifications = await this.prismaService.notification.findMany({
      where: { userId: currentUserId },
      omit: { userId: true },
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: notifications,
    };
  }

  async sendNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<ApiResponse<Notification>> {
    const notification = await this.prismaService.notification.create({
      data: {
        userId: createNotificationDto.userId,
        title: createNotificationDto.title,
        detail: createNotificationDto.detail,
      },
    });

    return {
      data: notification,
    };
  }

  async updateIsRead(id: string): Promise<ApiResponse<Notification>> {
    const notification = await this.prismaService.notification.update({
      where: { id },
      data: { isRead: true },
    });

    return {
      data: notification,
    };
  }

  async readAllNotification(currentUserId: string): Promise<ApiResponse<null>> {
    await this.prismaService.notification.updateMany({
      where: { userId: currentUserId },
      data: { isRead: true },
    });

    return {
      data: null,
    };
  }
}
