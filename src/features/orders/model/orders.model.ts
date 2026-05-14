import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from 'src/generated/prisma/enums';

type OrderItem = {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  imageUrl: string | null;
};

export class OrderHistoryResponse {
  id!: string;
  createdAt!: Date;
  orderStatus!: OrderStatus;
  paymentStatus!: PaymentStatus;
  paymentMethod!: PaymentMethod;
  totalAmount!: number;
  paymentProof!: string | null;
  items!: OrderItem[];
  user?: {
    id: string;
    fullname: string;
    email: string | null;
    phoneNumber: string | null;
    imageUrl: string | null;
  };
}
