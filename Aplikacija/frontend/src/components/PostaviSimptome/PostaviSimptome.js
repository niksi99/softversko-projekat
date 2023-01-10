import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Container, FieldContainer, FieldError, FieldInnerContainer, FieldTitle, FormStyled, LoginContainer, MultiLineField, ServerError, SubmitButton } from './PostaviSimptome.styled'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addTiketThunk } from '../../store/thunks/tiket';
import { useHistory } from 'react-router-dom';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';

const PostaviSimptome = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.pacijent.podaci.userId);
    const isError = useSelector(state => state.user.isError);
    const isLoading = useSelector(state => state.loader.loader);
    const [sent, setIsSent] = useState(false);
    const {isPacijent, loaded} = useIsLoggedIn(); 
    useEffect(() => {
        if (sent && isLoading.length === 0 && !isError) {
            handleSuccess();
        } else {
            if (isError) {
                setIsSent(false);
            }
        }
    }, [sent, isLoading, isError])
    useEffect(() => {
        if (loaded) {
            if (isPacijent === false || isPacijent === "false") {
                history.replace("/");
            }
        }
    }, [loaded, isPacijent])
    const handleSuccess = () => {
        history.replace("/Tiketi");
    }
    
    const handleSubmit = (values) => {
        dispatch(addTiketThunk(values.title, values.text, userId));
        setIsSent(true);
    }
    const postSchema = Yup.object().shape({
        title: Yup.string().required("Ovo polje je obavezno!").min(5, "Mora imati barem 5 karaktera!"),
        text: Yup.string().required("Ovo polje je obavezno!").min(5, "Mora imati barem 5 karaktera!")
    })
    return (
        <Container>
            <LoginContainer>

                <Formik
                    initialValues={{
                        title: '',
                        text: '',
                    }}
                    validationSchema={postSchema}
                    onSubmit={handleSubmit}
                >
                    <FormStyled>
                        <FieldContainer>
                            <FieldInnerContainer>
                                <label htmlFor="title">Naslov</label>
                                <Field
                                    id="title"
                                    name="title"
                                    placeholder="Naslov"
                                    type="title"
                                />
                            </FieldInnerContainer>
                            <FieldError>
                                <ErrorMessage name="title" />

                            </FieldError>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldInnerContainer>
                                <label htmlFor="text">Opisi svoje simptome</label>
                                <MultiLineField>
                                    <Field id="text" name="text" type="text" component="textarea" />
                                </MultiLineField>
                            </FieldInnerContainer>


                            <FieldError>
                                <ErrorMessage name="text" />
                            </FieldError>
                        </FieldContainer>

                        {isError && <ServerError>Greska sa serverom!</ServerError>}

                        <SubmitButton type="submit">POSTAVI</SubmitButton>

                    </FormStyled>
                </Formik>
            </LoginContainer>
        </Container>
    )
}

export default PostaviSimptome