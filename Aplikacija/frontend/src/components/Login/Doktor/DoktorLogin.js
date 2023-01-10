import React, { useEffect } from 'react'
import { Container, ErrorLogin, FieldContainer, FieldError, FieldInnerContainer, FieldTitle, FormStyled, LoginContainer, NavLinkStyled, SubmitButton } from './DoktorLogin.styled'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginPacijentThunk } from '../../../store/thunks/pacijent';
import { NavLink, useHistory } from 'react-router-dom';
import { removeError } from '../../../store/actions/user';
import { Title } from '../../Profil/Pacijent/PacijentProfil.styled';
import { SecurityText } from '../Pacijent/PacijentLogin.styled';
import { loginDoktorThunk } from '../../../store/thunks/doktor';

const DoktorLogin = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const isError = useSelector(state => state.user.isError);
    const handleSubmit = (values) => {
        dispatch(loginDoktorThunk(values.userName, values.password));
    }
    const history = useHistory();
    useEffect(() => {
        if (isLoggedIn === true) {
            history.replace("/Tiketi");
        }
    }, [isLoggedIn])

    useEffect(() => {
        return () => dispatch(removeError());
    }, [])
    const loginSchema = Yup.object().shape({
        userName: Yup.string().min(5, 'Username ne sme biti manji od 5 karaktera!').required('Obavezno polje!'),
        password: Yup.string().min(8, "Šifra ne sme biti manja od 8 karaktera!").required("Obavezno polje!")
    });
    return (
        <Container>
            <LoginContainer>

                <Formik
                    initialValues={{
                        userName: '',
                        password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    <FormStyled>
                        <Title>Uloguj se kao doktor</Title>
                        <FieldContainer>
                            <FieldInnerContainer>
                                <label htmlFor="userName">Username</label>
                                <Field
                                    id="userName"
                                    name="userName"
                                    placeholder="Username..."
                                    type="text"
                                />
                            </FieldInnerContainer>
                            <FieldError>
                                <ErrorMessage name="userName" />

                            </FieldError>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldInnerContainer>

                                <label htmlFor="password">Password</label>
                                <Field placeholder="Password..." id="password" name="password" type="password" />
                            </FieldInnerContainer>

                            <FieldError>
                                <ErrorMessage name="password" />
                            </FieldError>
                        </FieldContainer>

                        {isError && <ErrorLogin>Nepostojeća kombinacija username i password!</ErrorLogin>}

                        <SubmitButton type="submit">Login</SubmitButton>
                    </FormStyled>
                </Formik>
            </LoginContainer>
            <SecurityText>* Svaki pokušaj neovlašćenog ulaza biće kažnjen po zakonu Republike Srbije</SecurityText>

        </Container>
    )
}

export default DoktorLogin