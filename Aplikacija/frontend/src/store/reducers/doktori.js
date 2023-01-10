import { createReducer } from "@reduxjs/toolkit";
import { setDoktori } from "../actions/doktori";

const podaciInitial = {
    doktori: []
}

export const doktoriReducer = createReducer({
    podaci: podaciInitial,
}, (builder) => {
    builder.addCase(setDoktori, (state, action) => {
        state.doktori = action.payload;
    })
})
