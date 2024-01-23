import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        isLoggedIn: false,
        info: null,
    }
}

export const authSlice = createSlice({
    name: "userStatus",
    initialState,
    reducers: {
        updateUserStatus: (state, action) => {
            state.user.isLoggedIn = action.payload.isLoggedIn
            state.user.info = action.payload.userInfo
        }
    }
})

export const { updateUserStatus } = authSlice.actions

export default authSlice.reducer