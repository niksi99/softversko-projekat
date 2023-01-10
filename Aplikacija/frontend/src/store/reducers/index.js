import { combineReducers } from "@reduxjs/toolkit";
import { chatReducer } from "./chat";
import { doktorReducer } from "./doktor";
import { doktoriReducer } from "./doktori";
import { loaderReducer } from "./loader";
import { pacijentReducer } from "./pacijent";
import { tiketiReducer } from "./tiketi";
import { userReducer } from "./user";

export const reducer = combineReducers({
        pacijent: pacijentReducer,
        tiketi: tiketiReducer,
        doktor: doktorReducer,
        user: userReducer,
        chat: chatReducer,
        loader: loaderReducer,
        doktori: doktoriReducer

})