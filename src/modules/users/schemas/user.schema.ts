import { Article } from '@modules/article/schemas/article.schema';
import { AbstractDocument } from '@modules/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false })
export class User extends AbstractDocument {

  @Prop({required: true})
  name: string

  @Prop({ required: true })
  email: string;

  @Prop({ select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
