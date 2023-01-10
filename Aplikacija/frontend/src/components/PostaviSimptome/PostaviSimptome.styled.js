import styled from "styled-components";
import {Form } from "formik"

export const Container = styled.div`
`
export const LoginContainer = styled.div`
    border: 1px solid black;
    margin: 0 200px;
    margin-top: 50px;
    padding: 20px;
    border-radius: 5px;
    @media (max-width: 768px) {
        width: 350px;
        margin: 20px auto;
    }

`

export const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 10px;
    & label {
        flex: 1;
    }
    & span input {
        height: 50px;
        padding-left: 7px;
        font-size: 16px;
    }

`
export const MultiLineField = styled.div`
    & textarea {
        height: 300px !important;
        width: 100% !important;
        vertical-align: start;
    }
`
export const FieldTitle = styled.span``
export const FieldError = styled.span`
    color: red;
`
export const FieldInnerContainer = styled.span`
    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`
export const SubmitButton = styled.button`
    position: absolute;
    right: 0;
    bottom: 0;
    /* background-color: #3d8bfd; */
    border-radius: 10px;
    background-color: white;
    padding: 10px;
    border: 0;
    color: #3d8bfd;
    border: 1px solid #3d8bfd;
    font-weight: bold;
    cursor: pointer;
    width: 99%;

    &:hover {
        background-color: #3d8bfd;
        color: white;
    }
`
export const FormStyled = styled(Form)`
    position: relative;
    padding-bottom: 40px;
`
export const ServerError = styled.div`
    color: red;
`