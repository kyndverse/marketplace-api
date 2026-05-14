import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GetOrdersQueryDto } from './dto/get-query-order.dto';
import { ApiResponse } from 'src/model/response.model';
import { Order } from './model/orders.model';
import { CreateOrderDto } from './dto/create-order.dtp';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async getOrderHistory(
    currentUserId: string,
    query: GetOrdersQueryDto,
  ): Promise<ApiResponse<Order[]>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const skip = (page - 1) * limit;

    const orderCount = await this.prismaService.order.count({
      where: {
        userId: currentUserId,
        status: query.status,
      },
    });

    const totalPages = Math.ceil(orderCount / limit);

    const orders = await this.prismaService.order.findMany({
      where: {
        userId: currentUserId,
        status: query.status,
      },
      take: limit,
      skip: skip,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        status: true,
        paymentStatus: true,
        totalAmount: true,
        paymentProof: true,
        paymentMethod: true,
        items: {
          include: {
            product: {
              select: {
                name: true,
                salePrice: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    const mappedOrders = orders.map((order) => ({
      id: order.id,
      date: order.createdAt,
      orderStatus: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      totalAmount: order.totalAmount,
      paymentProof: order.paymentProof,
      items: order.items.map((item) => ({
        id: item.id,
        name: item.product.name,
        price: item.product.salePrice,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
      })),
    }));

    return {
      data: mappedOrders,
      meta: {
        page: page,
        limit: limit,
        totalPages: totalPages,
      },
    };
  }

  async createOrder(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<ApiResponse<Order>> {
    const orderTransaction = await this.prismaService.$transaction(
      async (tx) => {
        let totalAmount = 0;
        const orderItemsData: Prisma.OrderItemCreateWithoutOrderInput[] = [];

        const productIds = dto.items.map((item) => item.productId);

        const products = await tx.product.findMany({
          where: {
            id: {
              in: productIds,
            },
          },
        });

        const productMap = new Map(
          products.map((product) => [product.id, product]),
        );

        for (const item of dto.items) {
          const product = productMap.get(item.productId);

          if (!product) {
            throw new NotFoundException(`Product not found`);
          }

          if (product.stock < item.quantity) {
            throw new BadRequestException(
              `Insufficient stock for ${product.name}`,
            );
          }

          const subtotal = product.salePrice * item.quantity;
          totalAmount += subtotal;

          orderItemsData.push({
            quantity: item.quantity,
            costPrice: product.costPrice,
            salePrice: product.salePrice,
            product: {
              connect: {
                id: product.id,
              },
            },
          });

          await tx.product.update({
            where: {
              id: product.id,
            },

            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }

        const tax = totalAmount * 0.11;
        const grandTotal = totalAmount + tax;

        const order = await tx.order.create({
          data: {
            userId,
            totalAmount: grandTotal,
            paymentMethod: dto.paymentMethod,
            paymentStatus: 'PENDING',
            status: 'PENDING',
            items: {
              create: orderItemsData,
            },
          },

          select: {
            id: true,
            createdAt: true,
            status: true,
            paymentStatus: true,
            totalAmount: true,
            paymentProof: true,
            paymentMethod: true,
            items: {
              include: {
                product: {
                  select: {
                    name: true,
                    salePrice: true,
                    imageUrl: true,
                  },
                },
              },
            },
          },
        });

        return order;
      },
    );

    return {
      data: {
        id: orderTransaction.id,
        date: orderTransaction.createdAt,
        orderStatus: orderTransaction.status,
        paymentStatus: orderTransaction.paymentStatus,
        paymentMethod: orderTransaction.paymentMethod,
        paymentProof: orderTransaction.paymentProof,
        totalAmount: orderTransaction.totalAmount,
        items: orderTransaction.items.map((item) => ({
          id: item.id,
          name: item.product.name,
          imageUrl: item.product.imageUrl,
          price: item.product.salePrice,
          quantity: item.quantity,
        })),
      },
    };
  }
}
