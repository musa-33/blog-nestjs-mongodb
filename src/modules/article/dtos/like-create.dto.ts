import { IsNotEmpty, IsEnum, IsUUID, IsString } from "class-validator";
export class CreateLikeDto {
  @IsString()
  @IsNotEmpty()
  readonly article: string;

  user: string;
}
