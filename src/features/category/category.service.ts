import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponse } from 'src/model/response.model';
import { Category } from 'src/generated/prisma/client';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryQueryDto } from './dto/find-query-category.dto';
import { createSlug } from './category.utils';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const slug = createSlug(createCategoryDto.name);

    const category = await this.prismaService.category.create({
      data: {
        name: createCategoryDto.name,
        slug,
      },
    });

    return { data: category };
  }

  async findAll(query: FindCategoryQueryDto): Promise<ApiResponse<Category[]>> {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;

    const categoryCount = await this.prismaService.category.count();
    const totalPages = Math.ceil(categoryCount / limit);

    const categories = await this.prismaService.category.findMany({
      take: limit,
      skip: skip,
      orderBy: { createdAt: 'desc' },
    });

    if (!categories) {
      throw new NotFoundException('Category not found');
    }

    return {
      data: categories,
      meta: {
        page: page,
        limit: limit,
        totalPages: totalPages,
      },
    };
  }

  async update(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const category = await this.prismaService.category.findUnique({
      where: { id },
      select: { id: true, slug: true },
    });

    if (!category) {
      throw new NotFoundException();
    }

    let slug: string;
    if (data.name) {
      slug = createSlug(data.name);
    } else {
      slug = category.slug;
    }

    const updatedCategory = await this.prismaService.category.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        slug,
      },
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
