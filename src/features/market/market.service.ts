/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ApiResponse } from 'src/model/response.model';

@Injectable()
export class MarketService {
  constructor(private prismaService: PrismaService) {}

  async getOpenStatus(): Promise<ApiResponse<boolean>> {
    const status = await this.prismaService.setting.findUnique({
      where: {
        key: 'open_market',
      },
    });

    if (!status) {
      throw new NotFoundException('Setting not found');
    }

    const bool = status.value === 'true';

    return {
      data: bool,
    };
  }

  async toggleOpenStatus(): Promise<ApiResponse<boolean>> {
    const status = await this.prismaService.setting.findUnique({
      where: {
        key: 'open_market',
      },
    });

    if (!status) {
      throw new NotFoundException('Setting not found');
    }

    const updated = await this.prismaService.setting.update({
      where: { key: 'open_market' },
      data: {
        value: status.value === 'false' ? 'true' : 'false',
      },
    });

    const bool = updated.value === 'true';

    return {
      data: bool,
    };
  }
}
