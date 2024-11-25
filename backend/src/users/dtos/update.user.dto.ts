import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsUnique } from 'src/validations/unique.decorator';

export class UpdateUserDto {
  id: number;

  @IsEmail()
  @IsUnique('user', 'email', 'id')
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
