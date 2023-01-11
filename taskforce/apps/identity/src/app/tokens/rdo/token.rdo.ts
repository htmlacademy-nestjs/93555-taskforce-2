import { Expose, Transform } from 'class-transformer';

export class TokenRDO {
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id' })
  public id: string;

  @Expose()
  public userId: string;

  @Expose()
  public hash: string;

  @Expose()
  public exp: number;
}
