import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignedRDO {
  @ApiProperty({ description: 'The uniq user ID', example: '13' })
  @Transform(({ obj }) => obj._id.toString())
  @Expose()
  public _id: string;

  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @Expose()
  public email: string;

  @ApiProperty({ description: 'Access token', example: 'JWT' })
  @Expose()
  public accessToken: string;

  @ApiProperty({ description: 'Refresh token', example: 'JWT' })
  @Expose()
  public refreshToken: string;
}
