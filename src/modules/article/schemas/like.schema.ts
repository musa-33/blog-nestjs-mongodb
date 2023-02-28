import { AbstractDocument } from "@modules/database/abstract.schema";
import { User } from "@modules/users/schemas/user.schema";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from 'mongoose';
import { Article } from "./article.schema";

export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  // for relations
  @Prop({ type: String, ref: 'User' })
  user: User | string;

  @Prop({ type: String, ref: 'Article' })
  article: Article | string;
}
export const LikeSchema = SchemaFactory.createForClass(Like)