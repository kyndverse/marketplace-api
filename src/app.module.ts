import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './infrastructure/cloudinary/cloudinary.module';
import { PrismaModule } from './database/prisma.module';
import { ProductsModule } from './features/products/products.module';
import { CategoryModule } from './features/category/category.module';
import { OrdersModule } from './features/orders/orders.module';
import { NotificationsModule } from './features/notifications/notifications.module';
import { ReportsModule } from './features/reports/reports.module';
import { MarketModule } from './features/market/market.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    CloudinaryModule,
    ProductsModule,
    CategoryModule,
    OrdersModule,
    NotificationsModule,
    ReportsModule,
    MarketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
