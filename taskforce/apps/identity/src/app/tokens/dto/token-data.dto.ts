import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@taskforce/shared-types';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class TokenDataDTO {
  @ApiProperty({ description: 'User id', example: '63bdabe359be689d03fdf3e8' })
  @IsString()
  public _id: string

  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @IsEmail({}, { message: 'Invalid email' })
  public email: string;

  @ApiProperty({ description: 'User role', example: 'Москва' })
  @IsString({ message: 'role is required' })
  @IsEnum(UserRole, { message: 'role must be valid' })
  public role: UserRole;
}
