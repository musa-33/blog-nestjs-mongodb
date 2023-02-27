import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  content: string

  @IsNumber()
  category: number

  @IsNotEmpty()
  tags: string[]

  user?: string
}
