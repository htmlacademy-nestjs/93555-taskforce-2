import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthSignInDTO {
  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @IsEmail({}, { message: 'Invalid email' })
  public email: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  @IsString()
  public password: string;
}
