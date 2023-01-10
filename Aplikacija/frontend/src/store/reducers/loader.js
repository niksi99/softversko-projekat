import { createReducer } from "@reduxjs/toolkit";
import { addLoader, removeLoader } from "../actions/loader";

export const loaderReducer = createReducer({
    loader: []
}, (builder) => {
    builder.addCase(addLoader, (state, action) => {
        state.loader.push("LOADING");
    })
    builder.addCase(removeLoader, (state, action) => {
        state.loader.pop();
    })
})