import { ApiProperty } from '@nestjs/swagger';
import { UserCity, UserRole } from '@taskforce/shared-types';
import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import { IsDate, IsEmail, IsEnum, IsString, Length, Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';


@ValidatorConstraint({ name: 'invalid age', async: false })
export class AgeValidator implements ValidatorConstraintInterface {
  validate(dateBirth: string) {
    const now = dayjs();
    return now.diff(dateBirth, 'year') >= 18;
  }
}

export class AuthSignUpDTO {
  @ApiProperty({ description: 'User name', example: 'John' })
  @IsString({ message: 'name is required' })
  @Length(3, 50, { message: 'min length is 3, max is 50' })
  public name: string;

  @ApiProperty({ description: 'User email', example: 'user@test.local' })
  @IsEmail({}, { message: 'Invalid email' })
  public email: string;

  @ApiProperty({ description: 'User city', example: 'Москва' })
  @IsString({ message: 'city is required' })
  @IsEnum(UserCity, { message: 'city must be valid' })
  @Transform(({ value }) => value as UserCity)
  public city: UserCity;

  @ApiProperty({ description: 'User password', example: '123456' })
  @IsString()
  @Length(6, 12, { message: 'min length is 6, max is 12' })
  public password: string;

  @ApiProperty({ description: 'User role', example: 'Москва' })
  @IsString({ message: 'role is required' })
  @IsEnum(UserRole, { message: 'role must be valid' })
  public role: UserRole;

  @ApiProperty({ description: 'User avatar', example: '' })
  public avatar: string;

  @ApiProperty({ description: 'User date birth', example: '1981-03-12' })
  @IsDate({ message: 'Invalid date birth' })
  @Validate(AgeValidator, { message: 'Invalid date birth' })
  @Transform(({ value }) => new Date(value))
  public birthDate: Date;


}
