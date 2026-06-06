import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ApiResponse } from 'src/model/response.model';
import {
  MonthlySalesReport,
  TopProductResponse,
} from './model/analytics.model';
import { OrderStatus, PaymentStatus } from 'src/generated/prisma/enums';

@Injectable()
export class AnalyticsService {
  constructor(private prismaService: PrismaService) {}

  async getMonthlySalesReport(
    year: number,
  ): Promise<ApiResponse<MonthlySalesReport[]>> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    const orders = await this.prismaService.order.findMany({
      where: {
        status: OrderStatus.COMPLETED,
        paymentStatus: PaymentStatus.PAID,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        items: true,
      },
    });

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];

    const result = months.map((month) => ({
      month,
      revenue: 0,
      volume: 0,
    }));

    for (const order of orders) {
      const monthIndex = order.createdAt.getMonth();

      result[monthIndex].revenue += order.totalAmount;

      result[monthIndex].volume += order.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
    }

    return {
      data: result,
    };
  }

  async getTopSellingProduct(): Promise<ApiResponse<TopProductResponse>> {
    const items = await this.prismaService.orderItem.findMany({
      where: {
        order: {
          status: 'COMPLETED',
          paymentStatus: 'PAID',
        },
      },
      include: {
        product: true,
      },
    });

    const map = new Map<
      string,
      {
        productName: string;
        totalSold: number;
      }
    >();

    for (const item of items) {
      const current = map.get(item.productId);

      if (current) {
        current.totalSold += item.quantity;
      } else {
        map.set(item.productId, {
          productName: item.product.name,
          totalSold: item.quantity,
        });
      }
    }

    const top = [...map.entries()].sort(
      (a, b) => b[1].totalSold - a[1].totalSold,
    )[0];

    if (!top) {
      throw new NotFoundException('Top selling not found');
    }

    return {
      data: {
        productId: top[0],
        productName: top[1].productName,
        totalSold: top[1].totalSold,
      },
    };
  }
}
