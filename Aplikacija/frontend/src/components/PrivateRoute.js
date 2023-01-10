import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import Loader from "./Loader/Loader";

export const PrivateRoute = (props) => {

    if (!props.loaded) {
        return <Loader/>
    }
    if (props.isLoggedIn) {
        return <React.Fragment>{props.children}</React.Fragment>
    }
    return <Redirect to="/NotFoundPage" />
}