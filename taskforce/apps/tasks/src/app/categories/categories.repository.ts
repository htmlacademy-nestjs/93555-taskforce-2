import { CRUDRepository } from '@taskforce/core';
import { CategoriesEntity } from './categories.entity';
import { Category } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository implements CRUDRepository<CategoriesEntity, number, Category> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(entity: CategoriesEntity): Promise<Category> {
    return this.prisma.category.create({
      data: entity.toObject(),
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }

  public findById(id: number): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: { id },
    });
  }

  public find(ids: number[] = []): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        id: { in: ids.length > 0 ? ids : undefined },
      },
    });
  }

  public update(id: number, entity: CategoriesEntity): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: { ...entity.toObject(), id },
    });
  }
}
