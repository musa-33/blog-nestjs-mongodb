import { AbstractDocument } from "@modules/database/abstract.schema";
import { User } from "@modules/users/schemas/user.schema";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { extend } from "joi";
import { Document } from 'mongoose';
import { Article } from "./article.schema";

export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like  extends AbstractDocument{
  // for relations
  @Prop({ type: String, ref: 'User' })
  user: User | string;

  @Prop({ type: String, ref: 'Article' })
  article: Article | string;
}
export const LikeSchema = SchemaFactory.createForClass(Like)