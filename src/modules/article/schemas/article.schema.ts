import { User } from '@modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { AbstractDocument } from '../../database/abstract.schema';

@Schema({ versionKey: false})
export class Article {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({required: true})
  title: string

  @Prop({required: true})
  content: string

  @Prop({required: true})
  category: number
  
  @Prop({required: true})
  tags: string[]

  @Prop({ default: 0 })
  likes: number;
  
  @Prop({ type: String, ref: 'User' })
  user: User | string;

}

export const ArticleSchema = SchemaFactory.createForClass(Article);
