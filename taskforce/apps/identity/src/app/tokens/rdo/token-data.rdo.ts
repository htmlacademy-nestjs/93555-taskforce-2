import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@taskforce/shared-types';

export class TokenDataRDO {
  @ApiProperty({ description: 'The uniq user ID', example: '72' })
  @Transform(({ obj }) => obj._id.toString())
  @Expose()
  public _id: string;

  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @Expose()
  public email: string;

  @ApiProperty({ description: '', example: '' })
  @Expose()
  public role: UserRole;

}
