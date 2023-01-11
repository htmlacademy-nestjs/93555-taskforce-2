import { CRUDRepository } from '@taskforce/core';
import { TagsEntity } from './tags.entity';
import { Tag } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsRepository implements CRUDRepository<TagsEntity, number, Tag> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TagsEntity): Promise<Tag> {
    return this.prisma.tag.create({
      data: item.toObject(),
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.tag.delete({
      where: { id },
    });
  }

  public findById(id: number): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: { id },
    });
  }

  public find(ids: number[] = []): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      where: {
        id: { in: ids.length > 0 ? ids : undefined },
      },
    });
  }

  public update(id: number, item: TagsEntity): Promise<Tag> {
    return this.prisma.tag.update({
      where: { id },
      data: { ...item.toObject(), id },
    });
  }
}
