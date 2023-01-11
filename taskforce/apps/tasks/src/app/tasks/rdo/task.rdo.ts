import { Category, Tag, Comment } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class TaskRDO {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public category: Category;

  @Expose()
  public status: string;

  @Expose()
  public price: number;

  @Expose()
  public image: string;

  @Expose()
  public address: string;

  @Expose()
  public tags: Tag[];

  @Expose()
  public userId: string;

  @Expose()
  public comments: Comment[]
}
