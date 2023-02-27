import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string
}
