import { createAction } from "@reduxjs/toolkit";

const createChatAction = (action) => createAction(`CHAT_${action}`);
export const setChat = createChatAction("SET");
export const addChat = createChatAction("ADD");
export const setPeople = createChatAction("SET_PEOPLE")
export const addPeople = createChatAction("ADD_PEOPLE");