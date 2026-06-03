import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  fullname!: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number tidak boleh kosong' })
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
  address!: string;
}

export class UpdateProfile extends PartialType(UpdateUserDto) {}
