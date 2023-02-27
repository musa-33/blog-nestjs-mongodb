import { PASSWORD_MESSAGE, PASSWORD_RULE } from '@lib/http-infra-lib/utils/common';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string


  @IsString()
  @Length(8, 24)
  @Matches(PASSWORD_RULE, PASSWORD_MESSAGE)
  @IsNotEmpty()
  readonly password: string;
}
