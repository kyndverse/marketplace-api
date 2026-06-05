import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as ExcelJS from 'exceljs';
import { ReceiptDto } from './dto/receipts-dto';

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

  async generateReceipt(receipt: ReceiptDto): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
      });

      const chunks: Buffer[] = [];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const formatCurrency = (amount: number) =>
        `Rp ${amount.toLocaleString('id-ID')}`;

      const subtotal = receipt.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0,
      );

      const grandTotal = subtotal + receipt.serviceFee;

      //-----------------------------------
      // HEADER
      //-----------------------------------

      doc.font('Helvetica-Bold').fontSize(24).text('STRUK DIGITAL', {
        align: 'center',
      });

      doc
        .font('Helvetica')
        .fontSize(10)
        .fillColor('gray')
        .text('Terima kasih telah berbelanja', {
          align: 'center',
        });

      doc.fillColor('black');

      doc.moveDown(2);

      //-----------------------------------
      // INFORMASI TRANSAKSI
      //-----------------------------------

      const leftX = 50;
      const rightX = 320;

      let infoY = doc.y;

      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor('gray')
        .text('ID TRANSAKSI', leftX, infoY);

      doc.text('TANGGAL', rightX, infoY);

      doc
        .font('Helvetica-Bold')
        .fontSize(11)
        .fillColor('black')
        .text(receipt.transactionId, leftX, infoY + 15);

      doc.font('Helvetica').text(receipt.transactionDate, rightX, infoY + 15);

      infoY += 60;

      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor('gray')
        .text('PELANGGAN', leftX, infoY);

      doc.text('STATUS PEMBAYARAN', rightX, infoY);

      doc
        .font('Helvetica')
        .fontSize(11)
        .fillColor('black')
        .text(receipt.customerName, leftX, infoY + 15);

      doc
        .font('Helvetica-Bold')
        .text(receipt.paymentStatus, rightX, infoY + 15);

      doc.y = infoY + 60;

      doc.moveDown();

      //-----------------------------------
      // GARIS PEMBATAS
      //-----------------------------------

      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();

      doc.moveDown();

      //-----------------------------------
      // HEADER TABEL
      //-----------------------------------

      const productX = 50;
      const qtyX = 320;
      const priceX = 390;
      const totalX = 480;

      const tableY = doc.y;

      doc.font('Helvetica-Bold').fontSize(11);

      doc.text('Produk', productX, tableY);

      doc.text('Qty', qtyX, tableY);

      doc.text('Harga', priceX, tableY);

      doc.text('Total', totalX, tableY);

      doc.moveDown(1.5);

      //-----------------------------------
      // ITEMS
      //-----------------------------------

      receipt.items.forEach((item) => {
        const total = item.price * item.qty;

        const y = doc.y;

        doc.font('Helvetica-Bold').fontSize(11).text(item.name, productX, y, {
          width: 220,
        });

        doc.font('Helvetica').fontSize(9).fillColor('gray').text(item.category);

        doc.fillColor('black');

        doc.fontSize(10).text(item.qty.toString(), qtyX, y);

        doc.text(formatCurrency(item.price), priceX, y);

        doc.text(formatCurrency(total), totalX, y);

        doc.moveDown(1.5);
      });

      //-----------------------------------
      // GARIS PEMBATAS
      //-----------------------------------

      doc.moveDown();

      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();

      doc.moveDown(2);

      //-----------------------------------
      // SUMMARY
      //-----------------------------------

      const labelX = 330;
      const valueX = 430;

      doc.font('Helvetica').fontSize(11);

      doc.text('Subtotal', labelX, doc.y);

      doc.text(formatCurrency(subtotal), valueX, doc.y - 14, {
        width: 100,
        align: 'right',
      });

      doc.moveDown();

      doc.text('Biaya Layanan', labelX, doc.y);

      doc.text(formatCurrency(receipt.serviceFee), valueX, doc.y - 14, {
        width: 100,
        align: 'right',
      });

      doc.moveDown(2);

      //-----------------------------------
      // TOTAL
      //-----------------------------------

      doc.moveTo(330, doc.y).lineTo(545, doc.y).stroke();

      doc.moveDown();

      doc.font('Helvetica-Bold').fontSize(16);

      doc.text('TOTAL', labelX, doc.y);

      doc.text(formatCurrency(grandTotal), valueX - 20, doc.y - 18, {
        width: 120,
        align: 'right',
      });

      //-----------------------------------
      // CATATAN
      //-----------------------------------

      if (receipt.pickupNote) {
        doc.moveDown(3);

        const noteY = doc.y;
        const noteWidth = 470;

        // hitung tinggi teks terlebih dahulu
        const noteTextHeight = doc.heightOfString(receipt.pickupNote, {
          width: noteWidth,
          align: 'left',
        });

        const boxHeight = noteTextHeight + 40;

        // box
        doc.roundedRect(50, noteY, 495, boxHeight, 6).stroke('#d9d9d9');

        // title
        doc
          .font('Helvetica-Bold')
          .fontSize(11)
          .fillColor('black')
          .text('Catatan Pengambilan', 65, noteY + 10);

        // content
        doc
          .font('Helvetica')
          .fontSize(10)
          .fillColor('#666')
          .text(receipt.pickupNote, 65, noteY + 28, {
            width: noteWidth,
            align: 'left',
          });

        doc.fillColor('black');

        doc.y = noteY + boxHeight + 10;
      }

      doc.end();
    });
  }
}
