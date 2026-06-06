import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiResponse } from 'src/model/response.model';
import {
  MonthlySalesReport,
  TopProductResponse,
} from './model/analytics.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Roles('ADMIN')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api/analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('revenue/monthly')
  getMonthlyRevenue(
    @Query('year', ParseIntPipe) year: number,
  ): Promise<ApiResponse<MonthlySalesReport[]>> {
    return this.analyticsService.getMonthlySalesReport(year);
  }

  @Get('top-product')
  getTopProduct(): Promise<ApiResponse<TopProductResponse>> {
    return this.analyticsService.getTopSellingProduct();
  }
}
