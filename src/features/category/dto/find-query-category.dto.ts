import { Type } from 'class-transformer';
import { IsInt, IsPositive, Max } from 'class-validator';

export class FindCategoryQueryDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(50)
  limit!: number;
}
