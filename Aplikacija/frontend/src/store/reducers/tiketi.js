import { createReducer } from "@reduxjs/toolkit";
import { addTiket, addTiketi, addTiketRated, removeTiket, setBrojNeprocitanihTiketa, setBrojTiketa, setTiketi } from "../actions/tiketi";

export const tiketiReducer = createReducer({
    brojTiketa: 0,
    tiketi: [],
    tiketiRated: [],
    brojNeprocitanihTiketa: 0,
    recentlyRatedTiket: ""
}, (builder) => {
    builder.addCase(setTiketi, (state, action) => {
        state.tiketi = action.payload;
        state.brojTiketa = action.payload.length
    });
    builder.addCase(addTiket, (state, action) => {
        state.tiketi = [...state.tiketi, action.payload];
        state.brojTiketa = state.brojTiketa + 1;
    });
    builder.addCase(removeTiket, (state, action) => {
        state.tiketi = [...state.tiketi.filter(item => item.id !== action.payload)];
    });
    builder.addCase(addTiketRated, (state, action) => {
        state.recentlyRatedTiket = action.payload;
    })
    builder.addCase(addTiketi, (state, action) => {
        state.tiketi = [...state.tiketi, ...action.payload];
        state.brojTiketa = state.brojTiketa + action.payload.length;
    } )
    builder.addCase(setBrojTiketa, (state, action) => {
        state.brojTiketa = action.payload;
    });
    builder.addCase(setBrojNeprocitanihTiketa, (state, action) => {
        state.brojNeprocitanihTiketa = action.payload;
    })
})