import { createReducer } from "@reduxjs/toolkit";
import { addChat, addPeople, setChat, setPeople } from "../actions/chat";

export const chatReducer = createReducer({
    lastMessages: [],
    personsPossibleToChat: [],
}, (builder) => {
    builder.addCase(setChat, (state, action) => {
        state.lastMessages = action.payload;
    });
    builder.addCase(setPeople, (state, action) => {
        state.personsPossibleToChat = action.payload
    });
    builder.addCase(addPeople, (state, action) => {
        state.personsPossibleToChat = [...state.personsPossibleToChat, ...action.payload]
    })
})