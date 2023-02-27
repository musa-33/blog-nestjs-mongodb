import { Article } from '@modules/article/schemas/article.schema';
import { AbstractDocument } from '@modules/database/abstract.schema';
import { User } from '@modules/users/schemas/user.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type CommentDocument = Comment & Document

@Schema({ timestamps: true })
export class Comment extends AbstractDocument{
  @Prop()
  comment: string;

  @Prop({ type: String, ref: 'User' })
  user: User | string;

  @Prop({ type: String, ref: 'Article' })
  article: Article | string;

}

export const CommentSchema = SchemaFactory.createForClass(Comment)