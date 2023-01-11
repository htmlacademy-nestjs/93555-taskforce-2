import { Injectable } from '@nestjs/common';
import { Category } from '@taskforce/shared-types';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { CategoriesEntity } from './categories.entity';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoriesRepository) { }

  async createCategory(dto: CreateCategoryDTO): Promise<Category> {
    const categoriesEntity = new CategoriesEntity(dto);
    return this.categoryRepository.create(categoriesEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    this.categoryRepository.delete(id);
  }

  async getCategory(id: number): Promise<Category> {
    return this.categoryRepository.findById(id);
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async updateCategory(id: number, dto: UpdateCategoryDTO): Promise<Category> {
    return this.categoryRepository.update(id, new CategoriesEntity(dto));
  }
}
