import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './infrastructure/cloudinary/cloudinary.module';
import { PrismaModule } from './database/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './features/category/category.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    CloudinaryModule,
    ProductsModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
