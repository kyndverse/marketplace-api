import { IsEnum } from 'class-validator';
import { PaymentStatus } from 'src/generated/prisma/enums';

export class UpdatePaymentStatusDto {
  @IsEnum(PaymentStatus)
  paymentStatus!: PaymentStatus;
}
