import { Expose } from 'class-transformer';

export class TagRDO {
  @Expose()
  public id: string;

  @Expose()
  public title: string;
}
