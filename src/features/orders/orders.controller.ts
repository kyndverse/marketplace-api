import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { GetOrdersQueryDto } from './dto/get-query-order.dto';
import { ApiResponse } from 'src/model/response.model';
import { OrderHistoryResponse } from './model/orders.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dtp';
import type { JwtPayload } from 'src/auth/model/auth.model';

@UseGuards(JwtAuthGuard)
@Controller('/api/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

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
}
