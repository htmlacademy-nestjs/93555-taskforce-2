import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserCity, UserRole } from '@taskforce/shared-types';

export class UserRDO {
  @ApiProperty({ description: 'The uniq user ID', example: '72' })
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public _id: string;

  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @Expose()
  public email: string;

  @ApiProperty({ description: 'User name', example: 'John' })
  @Expose()
  public name: string;

  @ApiProperty({ description: 'User date birth', example: '1981-03-12' })
  @Expose()
  public birthDate: string;

  @ApiProperty({ description: '', example: '' })
  @Expose()
  public city: UserCity;

  @ApiProperty({ description: 'User avatar', example: 'images/superhero.png' })
  @Expose()
  public avatar: string;

  @ApiProperty({ description: '', example: '' })
  @Expose()
  public role: UserRole;

  @ApiProperty({ description: '', example: '' })
  @Expose()
  public info: string;

  @ApiProperty({ description: '', example: '' })
  @Expose()
  public publishedTasks?: number;

  @ApiProperty({ description: '', example: '' })
  @Expose()
  public newTasks?: number;

  @ApiProperty({ description: '', example: '' })
  @Expose()
  public specializations?: string[];

  @ApiProperty({ description: '', example: '' })
  @Expose()
  public rating?: number;

  @ApiProperty({ description: '', example: '' })
  @Expose()
  public rank?: number;

  @ApiProperty({ description: '', example: '' })
  @Expose()
  public completedTasks?: number;

  @ApiProperty({ description: '', example: '' })
  @Expose()
  public failedTasks?: number;
}
