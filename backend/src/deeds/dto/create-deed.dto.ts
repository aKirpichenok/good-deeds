import { ObjectId } from "mongoose";

export class CreateDeedDto {
  readonly title: string;
  readonly nickname: string;
  readonly date: string;
  readonly description: string;
  readonly userId: ObjectId
}