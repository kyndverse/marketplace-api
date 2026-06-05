import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GetOrdersQueryDto } from './dto/get-query-order.dto';
import { ApiResponse } from 'src/model/response.model';
import {
  OrderHistoryResponse,
  UpdatedOrderStatusResponse,
  UpdatedPaymentStatusResponse,
  UploadPaymentProofResponse,
} from './model/orders.model';
import { CreateOrderDto } from './dto/create-order.dtp';
import {
  OrderStatus,
  PaymentStatus,
  Prisma,
} from 'src/generated/prisma/client';
import { JwtPayload } from 'src/auth/model/auth.model';
import { CloudinaryService } from 'src/infrastructure/cloudinary/cloudinary.service';
import { ReceiptDto } from '../reports/dto/receipts-dto';
import { formatDateTimeWIB } from 'src/common/utils/format-date';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getOrderHistory(
    user: JwtPayload,
    query: GetOrdersQueryDto,
  ): Promise<ApiResponse<OrderHistoryResponse[]>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const skip = (page - 1) * limit;

    const isAdmin = user.role === 'ADMIN';
    const whereClause = isAdmin
      ? {
          status: query.status,
        }
      : {
          userId: user.sub,
          status: query.status,
        };

    const orderCount = await this.prismaService.order.count({
      where: whereClause,
    });

    const totalPages = Math.max(1, Math.ceil(orderCount / limit));

    const orders = await this.prismaService.order.findMany({
      where: whereClause,
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
        ...(isAdmin && {
          user: {
            select: {
              id: true,
              fullname: true,
              email: true,
              phoneNumber: true,
              imageUrl: true,
            },
          },
        }),
        items: {
          select: {
            id: true,
            quantity: true,
            salePrice: true,
            product: {
              select: {
                name: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    const mappedOrders = orders.map(({ status, items, ...rest }) => ({
      ...rest,
      orderStatus: status,

      items: items.map(({ product, ...item }) => ({
        ...item,
        name: product.name,
        imageUrl: product.imageUrl,
      })),
    }));

    return {
      data: mappedOrders,
      meta: {
        page: page,
        limit: limit,
        totalPages: totalPages,
        totalItems: orderCount,
      },
    };
  }

  async createOrder(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<ApiResponse<OrderHistoryResponse>> {
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

        const tax = totalAmount * 0;
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
        createdAt: orderTransaction.createdAt,
        orderStatus: orderTransaction.status,
        paymentStatus: orderTransaction.paymentStatus,
        paymentMethod: orderTransaction.paymentMethod,
        paymentProof: orderTransaction.paymentProof,
        totalAmount: orderTransaction.totalAmount,
        items: orderTransaction.items.map((item) => ({
          id: item.id,
          name: item.product.name,
          imageUrl: item.product.imageUrl,
          salePrice: item.product.salePrice,
          quantity: item.quantity,
        })),
      },
    };
  }

  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<ApiResponse<UpdatedOrderStatusResponse>> {
    const existingOrder = await this.prismaService.order.findUnique({
      where: {
        id: orderId,
      },

      select: {
        id: true,
        status: true,
      },
    });

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    if (
      existingOrder.status === 'COMPLETED' ||
      existingOrder.status === 'CANCELLED'
    ) {
      throw new BadRequestException(
        `Cannot update ${existingOrder.status.toLowerCase()} order`,
      );
    }

    const updatedOrder = await this.prismaService.order.update({
      where: { id: orderId },
      data: { status },
      select: {
        id: true,
        status: true,
        updatedAt: true,
      },
    });

    return {
      data: updatedOrder,
    };
  }

  async updatePaymentStatus(
    orderId: string,
    paymentStatus: PaymentStatus,
  ): Promise<ApiResponse<UpdatedPaymentStatusResponse>> {
    const existingOrder = await this.prismaService.order.findUnique({
      where: {
        id: orderId,
      },

      select: {
        id: true,
        paymentStatus: true,
      },
    });

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    if (
      existingOrder.paymentStatus === 'PAID' ||
      existingOrder.paymentStatus === 'REJECTED'
    ) {
      throw new BadRequestException(
        `Cannot update ${existingOrder.paymentStatus.toLowerCase()} payment`,
      );
    }

    const updatedOrder = await this.prismaService.order.update({
      where: { id: orderId },
      data: { paymentStatus },
      select: {
        id: true,
        paymentStatus: true,
        updatedAt: true,
      },
    });

    return {
      data: updatedOrder,
    };
  }

  async uploadPaymentProof(
    orderId: string,
    file: Express.Multer.File,
  ): Promise<ApiResponse<UploadPaymentProofResponse>> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
      select: { paymentProofId: true },
    });

    if (!order) {
      throw new NotFoundException('Product not found!');
    }

    if (order.paymentProofId) {
      await this.cloudinaryService.deleteImage(order.paymentProofId);
    }

    const uploadResult = await this.cloudinaryService.uploadImage(
      file,
      'payment-proof',
    );

    const updatedOrder = await this.prismaService.order.update({
      where: { id: orderId },
      data: {
        paymentProof: uploadResult.public_id,
        paymentProofId: uploadResult.secure_url,
      },
      select: {
        id: true,
        paymentProof: true,
        paymentProofId: true,
        updatedAt: true,
      },
    });

    return {
      data: updatedOrder,
    };
  }

  async getOrderReceiptData(id: string): Promise<ReceiptDto> {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        status: true,
        paymentStatus: true,
        totalAmount: true,
        paymentProof: true,
        paymentMethod: true,
        user: {
          select: {
            fullname: true,
          },
        },
        items: {
          select: {
            id: true,
            quantity: true,
            salePrice: true,
            product: {
              select: {
                name: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found!');
    }

    const ReceiptItems = order.items.map((item) => ({
      name: item.product.name,
      category: item.product.category.name,
      qty: item.quantity,
      price: item.salePrice,
    }));

    return {
      customerName: order.user.fullname,
      paymentStatus: order.paymentStatus,
      serviceFee: 0,
      transactionId: order.id,
      transactionDate: formatDateTimeWIB(order.createdAt),
      pickupNote:
        'Mohon pesanan diambil sebelum pukul 18:00 WIB. Tunjukkan struk digital ini atau sebutkan ID Transaksi kepada petugas di outlet Warung Pak Jojon',
      items: ReceiptItems,
    };
  }
}
