import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCommentDto {

    @Length(3, 255, { message: 'comment must be longer than 3 characters' })
    @IsString()
    @IsNotEmpty()
    readonly comment: string;

    @IsString()
    @IsOptional()
    readonly article?: string;

    user?: string;
}
