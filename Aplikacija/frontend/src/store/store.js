import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { reducer } from "./reducers";

const store = configureStore({
    reducer
})

export const ReduxProvider = (props) => {
    return (
        <Provider store={store}>
            {props.children}
            
        </Provider>
    )
}