import { createReducer } from "@reduxjs/toolkit";
import { clearPacijent, setPacijent } from "../actions/pacijent";

const podaciInitial = {
    brojZdravstveneKnjizice: null,
    lbo: null,
    zdravstveniKarton: null,
    id: "",
    ime: "",
    prezime: "",
    jmbg: "",
    userName: "",
    email: "",
}

export const pacijentReducer = createReducer({
    podaci: podaciInitial,
}, (builder) => {
    builder.addCase(setPacijent, (state, action) => {
        state.podaci = action.payload;
    })
    builder.addCase(clearPacijent, (state, action) => {
        state.podaci = podaciInitial;
    })
})