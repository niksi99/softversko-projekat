import { createReducer } from "@reduxjs/toolkit";
import { clearDoktor, setDoktor, setKolege } from "../actions/doktor";

const podaciInitial = {
    userId: "",
    ime: "",
    prezime: "",
    datumRodjenja: "",
    jmbg: null,
    biografija: "",
    specijalizacija: null
}

export const doktorReducer = createReducer({
    podaci: podaciInitial,
    kolege: []
}, (builder) => {
    builder.addCase(setKolege, (state, action) => {
        state.kolege = action.payload;
    })
    builder.addCase(setDoktor, (state, action) => {
        state.podaci = action.payload;
    });
    builder.addCase(clearDoktor, (state, action) => {
        state.podaci = podaciInitial;
    });
})