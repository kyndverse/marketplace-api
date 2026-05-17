import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ReportsService } from './reports.service';
import type { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('/api/reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('financial/excel')
  async downloadExcel(@Res() res: Response) {
    const buffer = await this.reportsService.generateFinancialReport();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=laporan-keuangan.xlsx',
    );

    res.end(buffer);
  }
}
