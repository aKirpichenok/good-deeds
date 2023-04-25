import { IDeed } from "./deed"

export interface IUser {
  name: string
  password: string
  female: string
  nickname: string
  friends: string[]
  deeds: IDeed[]
  token: string
  id: string
}