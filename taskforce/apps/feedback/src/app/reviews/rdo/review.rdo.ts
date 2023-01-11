import { Expose } from 'class-transformer';

export class ReviewRDO {
  @Expose()
  public id: string;

  @Expose()
  public text: string;

  @Expose()
  public taskId: number;

  @Expose()
  public rating: number;

  @Expose()
  public userId: string;

  @Expose()
  public createdAt: string;
}
