import styled from "styled-components";

export const Backdrop = styled.div`
    background-color: rgb(0, 0, 0, 0.75);
    z-index: 51;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    text-align: center;
    padding-top: 35vh;
`
export const LoaderContainer = styled.div`
    background-color: rgb(255, 255, 255, 1);
    width: 90px;
    height: 50px;
    padding-top: 14px;
    border-radius: 35px;
    margin: 0 auto;
`