import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { USER_EMAIL_NOT_VALID } from '../user.constants';

export class UserUpdatePasswordDTO {
  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @IsEmail({}, { message: USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  @IsString()
  @Length(6, 12, { message: 'min length is 6, max is 12' })
  public password: string;

  @ApiProperty({ description: 'New user password', example: '123456' })
  @IsString()
  @Length(6, 12, { message: 'min length is 6, max is 12' })
  public newPassword: string;
}
