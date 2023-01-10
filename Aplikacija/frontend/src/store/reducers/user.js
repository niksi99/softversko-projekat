import { createReducer } from "@reduxjs/toolkit";
import { logOut, logIn, addError, removeError } from "../actions/user";

export const userReducer = createReducer({
    userId: "",
    token: "",
    isPacijent: null,
    isLoggedIn: false,
    isError: false,
}, (builder) => {
    builder.addCase(logIn, (state, {payload}) => {
        state.token = payload.token;
        state.isPacijent = payload.isPacijent;
        state.isLoggedIn = true;
        state.userId = payload.userId;

    });
    builder.addCase(logOut, (state, action) => {
        state.token = "";
        state.isPacijent = null;
        state.isLoggedIn = false;
        state.userId = ""
    })
    builder.addCase(addError, (state, action) => {
        state.isError = true;
        state.errorMsg = action.payload;
    })
    builder.addCase(removeError, (state, action) => {
        state.isError = false;
        state.errorMsg = "";
    })
})