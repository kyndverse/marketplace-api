import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiResponse } from 'src/model/response.model';
import {
  UpdatedOrderStatusResponse,
  UpdatedPaymentStatusResponse,
} from './model/orders.model';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('/api/admin/orders')
export class AdminOrdersController {
  constructor(private ordersService: OrdersService) {}

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ): Promise<ApiResponse<UpdatedOrderStatusResponse>> {
    return this.ordersService.updateOrderStatus(id, dto.status);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch(':id/payment-status')
  updatePaymentStatus(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentStatusDto,
  ): Promise<ApiResponse<UpdatedPaymentStatusResponse>> {
    return this.ordersService.updatePaymentStatus(id, dto.paymentStatus);
  }
}
