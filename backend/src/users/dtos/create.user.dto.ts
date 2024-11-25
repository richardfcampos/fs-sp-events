import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsUnique } from "src/validations/unique.decorator";

export class CreateUserDto {
  @IsEmail()
  @IsUnique('user', 'email')
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
