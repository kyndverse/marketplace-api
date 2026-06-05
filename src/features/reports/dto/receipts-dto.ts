export class ReceiptItemDto {
  name!: string;
  category!: string;
  qty!: number;
  price!: number;
}

export class ReceiptDto {
  transactionId!: string;
  customerName!: string;
  paymentStatus!: string;
  transactionDate!: string;

  serviceFee!: number;

  pickupNote?: string;

  items!: ReceiptItemDto[];
}
