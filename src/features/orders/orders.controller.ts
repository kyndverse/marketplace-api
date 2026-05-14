import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { GetOrdersQueryDto } from './dto/get-query-order.dto';
import { ApiResponse } from 'src/model/response.model';
import { Order } from './model/orders.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dtp';

@UseGuards(JwtAuthGuard)
@Controller('/api/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createOrder(
    @CurrentUser('sub') currentUserId: string,
    @Body() dto: CreateOrderDto,
  ): Promise<ApiResponse<Order>> {
    console.log(currentUserId);
    return this.ordersService.createOrder(currentUserId, dto);
  }

  @Get()
  getOrderHistory(
    @CurrentUser('sub') currentUserId: string,
    @Query() query: GetOrdersQueryDto,
  ): Promise<ApiResponse<Order[]>> {
    return this.ordersService.getOrderHistory(currentUserId, query);
  }
}
