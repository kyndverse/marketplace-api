import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponse } from 'src/model/response.model';
import { Category } from 'src/generated/prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const slug = createCategoryDto.name.trim().toLocaleLowerCase();

    const category = await this.prismaService.category.create({
      data: {
        name: createCategoryDto.name,
        slug,
      },
    });

    return { data: category };
  }

  async findAll(): Promise<ApiResponse<Category[]>> {
    const categories = await this.prismaService.category.findMany();

    if (!categories) {
      throw new NotFoundException();
    }

    return {
      data: categories,
    };
  }

  async update(
    id: string,
    data: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const category = await this.prismaService.category.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!category) {
      throw new NotFoundException();
    }

    const updatedCategory = await this.prismaService.category.update({
      where: { id },
      data,
    });

    return {
      data: updatedCategory,
    };
  }

  async remove(id: string) {
    const category = await this.prismaService.category.findUnique({
      select: { id: true },
      where: { id },
    });

    if (!category) {
      throw new NotFoundException();
    }

    await this.prismaService.category.delete({
      where: { id },
    });

    return {
      message: 'Delete category successfully',
    };
  }
}
