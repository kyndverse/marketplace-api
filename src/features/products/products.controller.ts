import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiResponse } from 'src/model/response.model';
import { Product } from './model/products.model';
import { FindProductQueryDto } from './dto/find-query-product.dto';

@UseGuards(JwtAuthGuard)
@Controller('/api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ApiResponse<Product>> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query() query: FindProductQueryDto,
  ): Promise<ApiResponse<Product[]>> {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ApiResponse<Product>> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ApiResponse<Product>> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    return this.productsService.remove(id);
  }
}
