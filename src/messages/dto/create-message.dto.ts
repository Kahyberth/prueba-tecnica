import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  @IsString()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
