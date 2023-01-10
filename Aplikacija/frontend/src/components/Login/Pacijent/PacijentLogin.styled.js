import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { NavLink } from "react-router-dom";


export const Container = styled.div`

`

export const LoginContainer = styled.div`
    width: 500px;
    border: 1px solid black;
    margin: 0 auto;
    margin-top: 50px;
    padding: 10px;
    border-radius: 5px;
    @media (max-width: 768px) {
        width: 300px;
        
    }

`
export const ErrorLogin = styled.div`
    color: red;
`
export const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 10px;
    @media (min-width: 769px) {
        & * {
        flex: 1;
    }
    & label {
        flex: 1;
    }
    & span input {
        flex: 2;
        height: 35px;
        padding-left: 7px;
    }
    }
    
    @media (max-width: 768px) {
        & span input {
            height: 35px;
            font-size: 16px;
            padding-bottom: 5px;
        }
    }

`
export const FieldTitle = styled.span``
export const FieldError = styled.span`
    color: red;
`
export const FieldInnerContainer = styled.span`
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`
export const SubmitButton = styled.button`
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #3d8bfd;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    border: 0;
    color: white;
    cursor: pointer;
`
export const FormStyled = styled(Form)`
    position: relative;
    padding-bottom: 40px;
`
export const NavLinkStyled = styled(NavLink)`
    text-decoration: none;
    color: #3d8bfd;
    display: block;
    text-align: center;
    padding-top: 30px;
`
export const SecurityText = styled.div`
    text-align: center;
    width: 200px;
    margin: 10px auto;
    font-size: 14px;
`