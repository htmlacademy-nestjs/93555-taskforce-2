import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { CategoryRDO } from './rdo/category.rdo';
import { CategoriesService } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created',
  })
  async createCategory(@Body() dto: CreateCategoryDTO) {
    const newCategory = await this.categoriesService.createCategory(dto);
    return fillObject(CategoryRDO, newCategory);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categories list',
  })
  async getCategories() {
    const categories = await this.categoriesService.getCategories();
    return fillObject(CategoryRDO, categories);
  }

  @Get(':categoryId')
  async getCategory(@Param('categoryId') categoryId: number) {
    const existTag = await this.categoriesService.getCategory(categoryId);
    return fillObject(CategoryRDO, existTag);
  }

  @Delete(':categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Param('categoryId') categoryId: number) {
    this.categoriesService.deleteCategory(categoryId);
  }

  @Patch(':categoryId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tag updated',
  })
  async updateTag(@Param('categoryId') categoryId: number, @Body() dto: UpdateCategoryDTO) {
    const updatedTag = await this.categoriesService.updateCategory(categoryId, dto);
    return fillObject(CategoryRDO, updatedTag);
  }
}
