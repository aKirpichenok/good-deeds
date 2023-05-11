import { IUserWithId } from "../Components/FriendsColumn/FriendsColumn"
import { IDeed } from "./deed"

export interface IUser {
  name: string
  password: string
  female: string
  nickname: string
  friends: IUserWithId[]
  deeds: IDeed[]
  token: string
  id: string
}