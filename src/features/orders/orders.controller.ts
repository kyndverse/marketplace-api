import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { GetOrdersQueryDto } from './dto/get-query-order.dto';
import { ApiResponse } from 'src/model/response.model';
import {
  OrderHistoryResponse,
  UploadPaymentProofResponse,
} from './model/orders.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dtp';
import type { JwtPayload } from 'src/auth/model/auth.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Response } from 'express';
import { ReportsService } from '../reports/reports.service';

@UseGuards(JwtAuthGuard)
@Controller('/api/orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private reportsService: ReportsService,
  ) {}

  @Post()
  createOrder(
    @CurrentUser('sub') currentUserId: string,
    @Body() dto: CreateOrderDto,
  ): Promise<ApiResponse<OrderHistoryResponse>> {
    return this.ordersService.createOrder(currentUserId, dto);
  }

  @Get()
  getOrderHistory(
    @CurrentUser() user: JwtPayload,
    @Query() query: GetOrdersQueryDto,
  ): Promise<ApiResponse<OrderHistoryResponse[]>> {
    return this.ordersService.getOrderHistory(user, query);
  }

  @Patch(':id/payment-proof')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  updateProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') orderId: string,
  ): Promise<ApiResponse<UploadPaymentProofResponse>> {
    return this.ordersService.uploadPaymentProof(orderId, file);
  }

  @Get(':id/receipt')
  async exportReceipt(@Param('id') id: string, @Res() res: Response) {
    const order = await this.ordersService.getOrderReceiptData(id);
    const pdf = await this.reportsService.generateReceipt(order);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=receipt-${id}.pdf`,
    });

    res.send(pdf);
  }
}
