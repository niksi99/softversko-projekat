import { createAction } from "@reduxjs/toolkit";

const createPacijentAction = (action) => createAction(`PACIJENT_${action}`);
export const setPacijent = createPacijentAction("SET");
export const loginPacijent = createPacijentAction("LOGIN")
export const clearPacijent = createPacijentAction("CLEAR");