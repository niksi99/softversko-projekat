import { createAction } from "@reduxjs/toolkit";

const createDoktorAction = (action) => createAction(`DOKTOR_${action}`);
export const setDoktor = createDoktorAction("SET");
export const clearDoktor = createDoktorAction("CLEAR");
export const setKolege = createDoktorAction("SET_KOLEGE")
