import { createAction } from "@reduxjs/toolkit";

const createDoktoriAction = (action) => createAction(`DOKTORI_${action}`);
export const setDoktori = createDoktoriAction("SET");
export const clearDoktor = createDoktoriAction("CLEAR");
export const setKolege = createDoktoriAction("SET_KOLEGE")