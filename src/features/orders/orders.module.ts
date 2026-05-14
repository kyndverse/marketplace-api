import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { AdminOrdersController } from './admin-orders.controller';
import { CloudinaryModule } from 'src/infrastructure/cloudinary/cloudinary.module';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController, AdminOrdersController],
  imports: [CloudinaryModule],
})
export class OrdersModule {}
