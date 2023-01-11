import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { USER_EMAIL_NOT_VALID } from '../user.constants';


export class UserUpdateAvatarDTO {
  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @IsEmail({}, { message: USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({ description: 'User avatar', example: 'user.png' })
  public avatar: string;
}
