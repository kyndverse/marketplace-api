import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ReportsService {
  // Tes excel js
  async generateFinancialReport() {
    const workbook = new ExcelJS.Workbook();

    // metadata
    workbook.creator = 'Ihsan App';
    workbook.created = new Date();

    // worksheet
    const sheet = workbook.addWorksheet('Laporan Keuangan');

    // columns
    sheet.columns = [
      {
        header: 'No',
        key: 'no',
        width: 10,
      },
      {
        header: 'Nama',
        key: 'name',
        width: 30,
      },
      {
        header: 'Pemasukan',
        key: 'income',
        width: 20,
      },
      {
        header: 'Pengeluaran',
        key: 'expense',
        width: 20,
      },
    ];

    // sample data
    const data = [
      {
        no: 1,
        name: 'Penjualan A',
        income: 1000000,
        expense: 250000,
      },
      {
        no: 2,
        name: 'Penjualan B',
        income: 2000000,
        expense: 500000,
      },
    ];

    // insert rows
    sheet.addRows(data);

    // styling header
    const headerRow = sheet.getRow(1);

    headerRow.font = {
      bold: true,
    };

    headerRow.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };

    // border semua cell
    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    // total
    const totalIncome = data.reduce((sum, item) => sum + item.income, 0);

    const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);

    sheet.addRow([]);

    sheet.addRow({
      name: 'TOTAL',
      income: totalIncome,
      expense: totalExpense,
    });

    // export buffer
    return await workbook.xlsx.writeBuffer();
  }
}
