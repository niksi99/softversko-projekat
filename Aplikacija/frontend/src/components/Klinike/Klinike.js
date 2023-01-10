import React from 'react';
import { KlinikaContainer, KlinikaContent, KlinikaDescription, KlinikaTitle, KlinikeContainer, KlinikaImageNeurologija, KlinikaImagePsihijatrija, KlinikaImageOtorinolaringologija, KlinikaImageHirurgija, KlinikaImageKardiologija, KlinikaImagePedijatrija } from './Klinike.styled';
import { useHistory } from 'react-router-dom';

const Specijalizacije = () => {

  const history = useHistory();

  const goNeurologija = () => {
    history.push("/Specijalizacije/Neurologija")
  }
  const goOtorinolaringologija = () => {
    history.push("/Specijalizacije/Otorinolaringologija")
  }
  const goHirurgija = () => {
    history.push("/Specijalizacije/Hirurgija")
  }
  const goPsihijatrija = () => {
    history.push("/Specijalizacije/Psihijatrija")
  }
  const goKardiologija = () => {
    history.push("/Specijalizacije/Kardiologija")
  }
  const goPedijatrija = () => {
    history.push("/Specijalizacije/Pedijatrija")
  }

  return (
    <KlinikeContainer>
      <KlinikaContainer onClick={goNeurologija}>
        <KlinikaImageNeurologija />
        <KlinikaContent>
          <KlinikaTitle>Neurologija</KlinikaTitle>
          <KlinikaDescription>Neurologija predstavlja granu medicine koja se bavi poremećajima nervnog sistema, a poreklo vodi od Interne medicine.</KlinikaDescription>
        </KlinikaContent>
      </KlinikaContainer>
      <KlinikaContainer onClick={goOtorinolaringologija}>
        <KlinikaImageOtorinolaringologija />
        <KlinikaContent>
          <KlinikaTitle>Otorinolaringologija</KlinikaTitle>
          <KlinikaDescription>Otorinolaringologija je grana medicine koja se bavi bolestima uva, nosa i grla.</KlinikaDescription>
        </KlinikaContent>
      </KlinikaContainer>
      <KlinikaContainer onClick={goHirurgija}>
        <KlinikaImageHirurgija />
        <KlinikaContent>
          <KlinikaTitle>Hirurgija</KlinikaTitle>
          <KlinikaDescription>Hirurgija je grana kliničke medicine koja se bavi proučavanjem i lečenjem bolesti koje se moraju lečiti radom ruku hirurga i primenom mehaničkih sredstava (instrumenata).</KlinikaDescription>
        </KlinikaContent>
      </KlinikaContainer>
      <KlinikaContainer onClick={goPsihijatrija}>
        <KlinikaImagePsihijatrija />
        <KlinikaContent>
          <KlinikaTitle>Psihijatrija</KlinikaTitle>
          <KlinikaDescription>Psihijatrija je medicinska disciplina koja se bavi proučavanjem porekla, mehanizama i procesa nastanka, oblika, rasprostranjenosti i lečenja psihičkih bolesti i poremećaja.</KlinikaDescription>
        </KlinikaContent>
      </KlinikaContainer>
      <KlinikaContainer onClick={goKardiologija}>
        <KlinikaImageKardiologija />
        <KlinikaContent>
          <KlinikaTitle>Kardiologija</KlinikaTitle>
          <KlinikaDescription>Kardiologija je grana medicine koja se bavi lečenjem bolesti srca i krvnih žila.</KlinikaDescription>
        </KlinikaContent>
      </KlinikaContainer>
      <KlinikaContainer onClick={goPedijatrija}>
        <KlinikaImagePedijatrija />
        <KlinikaContent>
          <KlinikaTitle>Pedijatrija</KlinikaTitle>
          <KlinikaDescription>Pedijatrija je grana medicine koja je definisana objektom svog interesa - detetom, od rođenja do kraja adolescencije.</KlinikaDescription>
        </KlinikaContent>
      </KlinikaContainer>
    </KlinikeContainer>
  )
}

export default Specijalizacije;