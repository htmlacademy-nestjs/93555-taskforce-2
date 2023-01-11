import { Expose } from 'class-transformer';

export class CategoryRDO {
  @Expose()
  public id: string;

  @Expose()
  public title: string;
}
