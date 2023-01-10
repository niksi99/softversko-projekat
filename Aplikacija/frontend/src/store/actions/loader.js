import { createAction } from "@reduxjs/toolkit";

const createLoaderAction = (action) => createAction(`LOADER_${action}`);
export const addLoader = createLoaderAction(`ADD`);
export const removeLoader = createLoaderAction(`REMOVE`);