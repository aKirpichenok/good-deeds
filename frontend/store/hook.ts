import { TypedUseSelectorHook, useDispatch } from "react-redux"
import { AppDispatch, AppState } from "./store"
import { useSelector } from "react-redux"

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector