import { ObjectId } from "mongoose";

export class CreateDeedDto {
  readonly title;
  readonly nickname;
  readonly date;
  readonly description;
  readonly userId: ObjectId
}