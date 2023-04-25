import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { AuthController } from "./api/AuthController";
import { UserController } from "./api/UserController";
import { DeedsController } from "./api/DeedsController";


export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthController.middleware, UserController.middleware, DeedsController.middleware)
  })
}

const store = makeStore()

setupListeners(store.dispatch)

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store


