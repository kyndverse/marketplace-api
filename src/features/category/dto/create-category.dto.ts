import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2, {
    message: 'Name must be at least 2 characters',
  })
  @MaxLength(50, {
    message: 'Name must be at most 50 characters',
  })
  name!: string;

  @IsOptional()
  @IsString()
  @MinLength(8, {
    message: 'Description must be at least 8 characters',
  })
  @MaxLength(255, {
    message: 'Description must be at most 255 characters',
  })
  description!: string;
}
