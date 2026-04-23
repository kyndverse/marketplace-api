import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponse } from 'src/model/response.model';
import { Category } from 'src/generated/prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('/api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<ApiResponse<Category[]>> {
    return this.categoryService.findAll();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    return this.categoryService.update(id, createCategoryDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
