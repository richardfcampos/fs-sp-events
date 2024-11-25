import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class AuthLoginDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
