import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from 'src/generated/prisma/enums';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
};

export class Order {
  id!: string;
  date!: Date;
  orderStatus!: OrderStatus;
  paymentStatus!: PaymentStatus;
  paymentMethod!: PaymentMethod;
  totalAmount!: number;
  paymentProof!: string | null;
  items!: OrderItem[];
}
