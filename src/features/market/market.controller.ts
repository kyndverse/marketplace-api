import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { MarketService } from './market.service';
import { ApiResponse } from 'src/model/response.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Roles('ADMIN')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api/market')
export class MarketController {
  constructor(private marketService: MarketService) {}

  @Get('open')
  getOpenStatus(): Promise<ApiResponse<boolean>> {
    return this.marketService.getOpenStatus();
  }

  @Patch('toggle-open')
  toggleOpenStatus(): Promise<ApiResponse<boolean>> {
    return this.marketService.toggleOpenStatus();
  }
}
