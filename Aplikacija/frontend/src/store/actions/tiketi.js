import { createAction } from "@reduxjs/toolkit";

const createTiketiAction = (action) => createAction(`TIKETI_${action}`);
export const addTiket = createTiketiAction("ADD");
export const addTiketi = createTiketiAction("ADD_MULTIPLE");
export const setTiketi = createTiketiAction("SET");
export const setBrojTiketa = createTiketiAction("SET_BROJ_TIKETA");
export const setBrojNeprocitanihTiketa = createTiketiAction("SET_BROJ_NEPROCITANIH_TIKETA");
export const removeTiket = createTiketiAction("REMOVE");
export const addTiketRated = createTiketiAction("ADD_RATED");