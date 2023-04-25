import { combineReducers } from "redux";
import userSlice from './userReducer'
import { AuthController } from "../api/AuthController";
import { UserController } from "../api/UserController";
import { DeedsController } from "../api/DeedsController";



const rootReducer = combineReducers({
  userReducer: userSlice,
  [AuthController.reducerPath]: AuthController.reducer,
  [UserController.reducerPath]: UserController.reducer,
  [DeedsController.reducerPath]: DeedsController.reducer
})


export default rootReducer