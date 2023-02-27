import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class ArticleSearchDto {
  @IsNumber()
  @IsOptional()
  category?: number

  @IsNotEmpty()
  @IsOptional()
  tags?: string
}
