import { ApiProperty } from '@nestjs/swagger';
import { UserCity } from '@taskforce/shared-types';
import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import { ArrayMaxSize, IsArray, IsDate, IsEnum, IsOptional, IsString, Length, MaxLength, Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'invalid age', async: false })
export class AgeValidator implements ValidatorConstraintInterface {
  validate(dateBirth: string) {
    const now = dayjs();
    return now.diff(dateBirth, 'year') >= 18;
  }
}

export class UserUpdateDTO {
  @ApiProperty({ description: 'User name', example: 'John', required: false })
  @IsString({ message: 'name is required' })
  @Length(3, 50, { message: 'min length is 3, max is 50' })
  @IsOptional()
  public name?: string;

  @ApiProperty({ description: 'User date birth', example: '1981-03-12', required: false })
  @IsDate({ message: 'The user date birth is not valid' })
  @Validate(AgeValidator, { message: 'The user date birth is not valid' })
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  public birthDate?: Date;

  @ApiProperty({ description: 'User info', example: 'John', required: false })
  @IsString({ message: 'info is required' })
  @MaxLength(300, { message: 'max is 300' })
  @IsOptional()
  public info?: string;

  @ApiProperty({ description: 'User specializations', example: ['developer', 'driver', 'cook'], required: false })
  @IsArray()
  @Transform(({ value }) => new Set(value.map(item => item.toLowerCase())))
  @ArrayMaxSize(5, { message: 'specializations must be valid' })
  @IsOptional()
  public specializations?: string[];

  @ApiProperty({ description: 'User city', example: 'Москва', required: false })
  @IsString({ message: 'city is required' })
  @IsEnum(UserCity, { message: 'city must be valid' })
  @Transform(({ value }) => value as UserCity)
  @IsOptional()
  public city?: UserCity;

  @ApiProperty({ description: 'User avatar', example: 'images/superhero.png', required: false, })
  @IsOptional()
  public avatar?: string;
}
