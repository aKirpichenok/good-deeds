import mongoose, { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document

@Schema()
export class User {

  @ApiProperty({ example: 'Андрей', description: 'Имя пользователя' })
  @Prop({ required: true })
  name: string

  @ApiProperty({ example: 'qwe123', description: 'Пароль пользователя' })
  @Prop({ required: true })
  password: string

  @ApiProperty({ example: 'Кирпиченок', description: 'Фамилия пользователя' })
  @Prop({ required: true })
  female: string

  @ApiProperty({ example: 'aKirpichenok', description: 'Уникальный nickname' })
  @Prop({ required: true, unique: true })
  nickname: string

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'User' })
  friends: string[]

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'Deed' })
  deeds: string[]
}


export const UserSchema = SchemaFactory.createForClass(User)