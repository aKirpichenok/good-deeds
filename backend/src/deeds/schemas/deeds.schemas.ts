import mongoose, { Document, ObjectId } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'
import { User } from 'src/user/schemas/user.schema';

export type DeedDocument = Deed & Document

@Schema()
export class Deed {

  @Prop({ required: true })
  nickname: string

  @Prop({ required: true })
  title: string

  @Prop()
  date: string

  @Prop({ required: true })
  description: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: ObjectId
}


export const DeedSchema = SchemaFactory.createForClass(Deed)