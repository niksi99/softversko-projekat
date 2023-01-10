import React, { useEffect } from 'react'
import { postRequest } from '../../../requests'
import {useSelector} from "react-redux"
import { Container, EditButton, Field, Label, ProfilContainer, Title, Value } from './PacijentProfil.styled'

const PacijentProfil = () => {
  const podaci = useSelector(state => state.pacijent.podaci);
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
          <Label>LBO </Label>
          <Value>{podaci.lbo}</Value>
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
          <Label>Broj zdravstvene knjizice </Label>
          <Value>{podaci.bzk}</Value>
        </Field>
      </ProfilContainer>
    </Container>
  )
}

export default PacijentProfil