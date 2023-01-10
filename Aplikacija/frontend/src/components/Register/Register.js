import React from 'react'
import { Container, ErrorLogin, FieldContainer, FieldError, FieldInnerContainer, FieldTitle, FormStyled, LoginContainer, NavLinkStyled, SubmitButton } from './Register.styled'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerPacijentThunk } from '../../store/thunks/pacijent';
import { useEffect } from 'react';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';
import { Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { removeError } from '../../store/actions/user';


const Register = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.user.errorMsg);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const { isLoggedIn } = useIsLoggedIn();

    useEffect(() => {
        return () => dispatch(removeError());
    })

    useEffect(() => {
        if (error || error?.length > 0) {
            let errorMessageTemp = "Greska sa serverom!"
            if (error?.error?.toString() === "Vec postoji pac sa taj broj z knjizice") {
                errorMessageTemp = "Vec postoji pacijent sa takvim brojem zdravstvene knjizice!";
            }
            if (error?.error?.toString() === "Vec postoji pac sa taj LBO") {
                errorMessageTemp = "Vec postoji pacijent sa takvim LBO brojem!";
            }
            if (error?.error?.toString() === "Vec postoji pacijent sa takvim mejlom") {
                errorMessageTemp = "Vec postoji pacijent sa takvim mejlom!";
            }
            if (error?.error?.toString() === "Vec postoji sa takvm UserName") {
                errorMessageTemp = "Vec postoji pacijent sa takvim username!";
            }
            setErrorMessage(errorMessageTemp);
        }
    }, [error])
    const handleSubmit = (values) => {
        dispatch(removeError());
        dispatch(registerPacijentThunk(
            values.username, values.ime, values.prezime, values.email, values.password,
            values.passwordConfirmation, values.bzk, values.lbo, values.jmbg)
        );
    }
    const poljeObavezno = "Polje je obavezno!";
    const manjeOd8 = "Polje ne sme biti manje od 8 karaktera!";
    const registerSchema = Yup.object().shape({
        username: Yup.string().required(poljeObavezno).min(4, manjeOd8),
        email: Yup.string().email("Mejl nije validan!").required(poljeObavezno),
        ime: Yup.string().required(poljeObavezno).min(3, manjeOd8),
        prezime: Yup.string().required(poljeObavezno).min(3, manjeOd8),
        jmbg: Yup.string().required(poljeObavezno).min(12, "JMBG mora imati 13 karaktera!"),
        lbo: Yup.number().required(poljeObavezno),
        bzk: Yup.number().required(poljeObavezno),
        password: Yup.string().required(poljeObavezno),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], "Lozinke se ne poklapaju!")
    })

    if (isLoggedIn === true) {
        return <Redirect to="/" />
    }

    return (
        <Container>
            <LoginContainer>

                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        ime: '',
                        prezime: '',
                        jmbg: '',
                        lbo: 0,
                        bzk: 0,
                        password: '',
                        passwordConfirmation: '',

                    }}
                    validationSchema={registerSchema}
                    onSubmit={handleSubmit}
                >
                    <FormStyled>
                        <FieldContainer>
                            <FieldInnerContainer>
                                <label htmlFor="username">Username</label>
                                <Field
                                    id="username"
                                    name="username"
                                    placeholder="Username..."
                                    type="text"
                                />
                            </FieldInnerContainer>
                            <FieldError>
                                <ErrorMessage name="username" />
                            </FieldError>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldInnerContainer>
                                <label htmlFor="ime">Ime</label>
                                <Field
                                    id="ime"
                                    name="ime"
                                    placeholder="Ime..."
                                    type="text"
                                />
                            </FieldInnerContainer>
                            <FieldError>
                                <ErrorMessage name="ime" />
                            </FieldError>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldInnerContainer>
                                <label htmlFor="prezime">Prezime</label>
                                <Field
                                    id="prezime"
                                    name="prezime"
                                    placeholder="Prezime..."
                                    type="text"
                                />
                            </FieldInnerContainer>
                            <FieldError>
                                <ErrorMessage name="prezime" />
                            </FieldError>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldInnerContainer>
                                <label htmlFor="email">E-mail</label>
                                <Field
                                    id="email"
                                    name="email"
                                    placeholder="E-mail..."
                                    type="text"
                                />
                            </FieldInnerContainer>
                            <FieldError>
                                <ErrorMessage name="email" />
                            </FieldError>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldInnerContainer>
                                <label htmlFor="jmbg">JMBG</label>
                                <Field
                                    id="jmbg"
                                    name="jmbg"
                                    placeholder="JMBG..."
                                    type="text"
                                />
                            </FieldInnerContainer>
                            <FieldError>
                                <ErrorMessage name="jmbg" />
                            </FieldError>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldInnerContainer>
                                <label htmlFor="lbo">LBO</label>
                                <Field
                                    id="lbo"
                                    name="lbo"
                                    placeholder="LBO..."
                                    type="text"
                                />
                            </FieldInnerContainer>
                            <FieldError>
                                <ErrorMessage name="lbo" />
                            </FieldError>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldInnerContainer>
                                <label htmlFor="bzk">Broj zdravstvene knjizice</label>
                                <Field
                                    id="bzk"
                                    name="bzk"
                                    placeholder="Broj zdravstvene knjizice..."
                                    type="text"
                                />
                            </FieldInnerContainer>
                            <FieldError>
                                <ErrorMessage name="bzk" />
                            </FieldError>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldInnerContainer>
                                <label htmlFor="password">Lozinka</label>
                                <Field
                                    id="password"
                                    name="password"
                                    placeholder="Lozinka..."
                                    type="password"
                                />
                            </FieldInnerContainer>
                            <FieldError>
                                <ErrorMessage name="password" />
                            </FieldError>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldInnerContainer>

                                <label htmlFor="passwordConfirmation">Potvrdi lozinku</label>
                                <Field placeholder="Potvrdi lozinku..." id="passwordConfirmation" name="passwordConfirmation" type="password" />
                            </FieldInnerContainer>

                            <FieldError>
                                <ErrorMessage name="passwordConfirmation" />
                            </FieldError>
                        </FieldContainer>

                        {errorMessage.length > 0 && <ErrorLogin>{errorMessage}</ErrorLogin>}


                        <SubmitButton type="submit">Register</SubmitButton>
                    </FormStyled>
                </Formik>
            </LoginContainer>
        </Container>
    )
}

export default Register