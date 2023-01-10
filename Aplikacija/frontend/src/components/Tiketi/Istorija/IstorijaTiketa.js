import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useIsLoggedIn } from '../../../hooks/useIsLoggedIn';
import { setTiketi } from '../../../store/actions/tiketi';
import { getTiketiDoktorThunk, getTiketiPacijentThunk } from '../../../store/thunks/tiket';
import { Container, EmptyPage, TiketContainer, TiketDatum, TiketDescription, TiketDoktor, TiketiList, TiketInfo, TiketPoslednjiOdgovor, TiketStatus, TiketTitle } from './IstorijaTiketa.styled'

const IstorijaTiketa = () => {
  const history = useHistory();
  const { isPacijent, loaded, isSpecijalizant } = useIsLoggedIn();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  const tiketi = useSelector(state => state.tiketi.tiketi);
  const doktorPodaci = useSelector(state => state.doktor.podaci);
  const [tiketiToShow, setTiketiToShow] = useState([]);
  useEffect(() => {
    dispatch(setTiketi([]));
    if (loaded && userId) {
        if (isPacijent) {
          dispatch(getTiketiPacijentThunk(userId))
        } else {
          dispatch(getTiketiDoktorThunk(userId, isSpecijalizant));
        }
    }
  }, [isPacijent, loaded, userId])

  useEffect(() => {
    const newTiketi = [];
    tiketi.forEach((item,index) => {
      if (!(!item.ocena || item.ocena === 0 || item.ocena === "0")) {
        newTiketi.push({...item, index});

      }
    });
    setTiketiToShow(newTiketi);
  }, [tiketi])

  return (
    <Container>
      <TiketiList>
        {tiketiToShow.map((item, index) => (
          <TiketContainer onClick={() => history.push(`/Istorija/${item.index.toString()}`)}>
            <TiketTitle>{item.naslov}</TiketTitle>
            <TiketDescription>{item.opis}</TiketDescription>
            <TiketPoslednjiOdgovor>Poslednji odgovor: {item.datumOdgovoraLekara}</TiketPoslednjiOdgovor>
            <TiketInfo>
              <TiketStatus>Status: Odgovoren</TiketStatus>
              <TiketStatus>Ocena: {item.ocena}</TiketStatus>
              <TiketDatum>Datum kreiranja: {item.datumObjave}</TiketDatum>
            </TiketInfo>
          </TiketContainer>
        ))}
        {tiketiToShow.length === 0 && (
          <EmptyPage>Trenutno nema ni jednog zatvorenog tiketa.</EmptyPage>
        )}
      </TiketiList>
    </Container>
  )
}

export default IstorijaTiketa;