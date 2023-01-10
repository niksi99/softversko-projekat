import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NotFoundPageContainer = styled.div`
    padding-top: 100px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    height: 70vh;
`
export const NotFoundPageText = styled.div`
    font-weight: bold;
    text-align: center;
    font-size: 26px;
    margin-bottom: 50px;
`
export const GoBackHome = styled(NavLink)`
    text-align: center;
`