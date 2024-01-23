import { configureStore } from "@reduxjs/toolkit"
import userStatusReducer from "../features/authSlice"

export const store = configureStore({
    reducer: userStatusReducer,
})
