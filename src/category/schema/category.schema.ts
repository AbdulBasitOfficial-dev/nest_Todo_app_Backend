import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type categoryDocumnet = Category & Document;
@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;
  @Prop()
  discription?: string;
}

export const categorySchema = SchemaFactory.createForClass(Category);
