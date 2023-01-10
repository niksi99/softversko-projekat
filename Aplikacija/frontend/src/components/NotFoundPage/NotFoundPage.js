import React from 'react'
import { GoBackHome, NotFoundPageContainer, NotFoundPageText } from './NotFoundPage.styled'

export const NotFoundPage = () => {
  return (
    <NotFoundPageContainer>
        <NotFoundPageText>
            Stranica nije pronadjena.
        </NotFoundPageText>
        <GoBackHome to="/">Vrati se nazad na početnu stranicu</GoBackHome>
    </NotFoundPageContainer>
  )
}
