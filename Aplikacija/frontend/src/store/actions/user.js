import { createAction } from "@reduxjs/toolkit";

const createUserAction = (action) => createAction(`USER_${action}`);
export const logIn = createUserAction("SET_USER_TOKEN");
export const logOut = createUserAction("LOGOUT");
export const addError = createUserAction("ADD_ERROR");
export const removeError = createUserAction("REMOVE_ERROR");