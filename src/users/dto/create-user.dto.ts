import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  name: string;
}
