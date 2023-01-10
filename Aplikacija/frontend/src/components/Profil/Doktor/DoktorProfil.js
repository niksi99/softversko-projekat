import React, { useEffect } from 'react'
import {useSelector} from "react-redux"
import { postRequest } from '../../../requests'
import { Container, EditButton, Field, Label, ProfilContainer, Title, Value } from './DoktorProfil.styled'

const DoktorProfil = () => {
  const podaci = useSelector(state => state.doktor.podaci)
  useEffect(() => {

  }, [])
  return (
    <Container>
      <ProfilContainer>
        <Title>Moj profil</Title>
        <Field>
          <Label>Username </Label>
          <Value>{podaci.username}</Value>
        </Field>
        <Field>
          <Label>Ime </Label>
          <Value>{podaci.ime}</Value>
        </Field>
        <Field>
          <Label>Prezime </Label>
          <Value>{podaci.prezime}</Value>
        </Field>
        <Field>
          <Label>Specijalizacija </Label>
          <Value>{podaci.specijalizacija}</Value>
        </Field>
        <Field>
          <Label>JMBG </Label>
          <Value>{podaci.jmbg}</Value>
        </Field>
        <Field>
          <Label>Mail </Label>
          <Value>{podaci.email}</Value>
        </Field>
        <Field>
          <Label>Broj licne karte </Label>
          <Value>{podaci.brojLicneKarte}</Value>
        </Field>
      </ProfilContainer>
    </Container>
  )
}

export default DoktorProfil