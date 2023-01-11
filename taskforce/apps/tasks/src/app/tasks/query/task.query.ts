import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_SORT_DIRECTION, DEFAULT_TASK_COUNT_LIMIT } from '../tasks.constants';
import { ApiProperty } from '@nestjs/swagger';

export class TaskQuery {
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value) || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_TASK_COUNT_LIMIT;

  @ApiProperty({ required: false })
  @Transform(({ value }) => value.map((tagId) => Number(tagId)))
  @IsArray()
  @IsOptional()
  public tags?: number[];

  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  public category: number;

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;
}
