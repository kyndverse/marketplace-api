import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ApiResponse } from 'src/model/response.model';
import { Product } from './model/products.model';
import { FindProductQueryDto } from './dto/find-query-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ApiResponse<Product>> {
    const category = await this.prismaService.category.findUnique({
      where: { id: createProductDto.categoryId },
      select: { id: true },
    });

    if (!category) {
      throw new BadRequestException('Invalid category Id');
    }

    const product = await this.prismaService.product.create({
      data: createProductDto,
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
      omit: { categoryId: true },
    });

    return {
      message: 'Create product successfully',
      data: product,
    };
  }

  async findAll(query: FindProductQueryDto): Promise<ApiResponse<Product[]>> {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;

    const productCount = await this.prismaService.product.count();
    const totalPages = Math.ceil(productCount / limit);

    const products = await this.prismaService.product.findMany({
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
      omit: { categoryId: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: skip,
    });

    if (!products) {
      throw new NotFoundException('Product not found!');
    }

    return {
      message: 'Get all product successfully!',
      data: products,
      meta: {
        page: page,
        limit: limit,
        totalPages: totalPages,
      },
    };
  }

  async findOne(id: string): Promise<ApiResponse<Product>> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: { categoryId: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return {
      data: product,
    };
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ApiResponse<Product>> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    const newProduct = await this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: { categoryId: true },
    });

    return {
      message: 'Create product successfully!',
      data: newProduct,
    };
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    await this.prismaService.product.delete({
      where: { id },
    });

    return {
      data: null,
      message: 'Delete product successfully!',
    };
  }
}
