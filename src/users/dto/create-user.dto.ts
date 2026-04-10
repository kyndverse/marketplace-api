import { Role } from 'src/generated/prisma/enums';

export class CreateUserDto {
  fullname!: string;
  email!: string;
  password?: string;
  role?: Role;
}
