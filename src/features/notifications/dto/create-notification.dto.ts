import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Title must be at least 3 characters',
  })
  @MaxLength(100, {
    message: 'Title must be at most 100 characters',
  })
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Detail must be at least 5 characters',
  })
  @MaxLength(255, {
    message: 'Detail must be at most 255 characters',
  })
  detail!: string;
}
