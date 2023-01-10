import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';
import { setTiketi } from '../../store/actions/tiketi';
import { getTiketiDoktorThunk, getTiketiPacijentThunk } from '../../store/thunks/tiket';
import { convertDateToString } from '../../utils/dateHelper';
import { Mockupdata } from './Mockupdata';
import { Container, EmptyPage, TiketContainer, TiketDatum, TiketDescription, TiketDoktor, TiketiList, TiketInfo, TiketPoslednjiOdgovor, TiketStatus, TiketTitle } from './Tiketi.styled'

const Tiketi = () => {
  const history = useHistory();
  const { isPacijent, loaded, isSpecijalizant } = useIsLoggedIn();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  const tiketi = useSelector(state => state.tiketi.tiketi);
  const doktorPodaci = useSelector(state => state.doktor.podaci);
  const [tiketiToShow, setTiketiToShow] = useState([]);
  const recentlyRatedTiket = useSelector(state => state.tiketi.recentlyRatedTiket);
  useEffect(() => {
    dispatch(setTiketi([]));
    console.log(isPacijent);
    console.log(userId);
    console.log()
    if (loaded && userId) {
      if (isPacijent === true || isPacijent === 'true') {
        dispatch(getTiketiPacijentThunk(userId))
      } else if (isPacijent === false || isPacijent === 'false') {
        dispatch(getTiketiDoktorThunk(userId, isSpecijalizant))
      }
    }
  }, [isPacijent, loaded, userId])

  useEffect(() => {
    const newTiketi = [];
    console.log(recentlyRatedTiket)
    tiketi.forEach((item, index) => {
      if (item.ocena === 0 || item.ocena === "0") {
        if (item.id.toString() !== recentlyRatedTiket.toString()) {
          newTiketi.push({ ...item, index: index });
        }
      }
      // }
    });
    setTiketiToShow(newTiketi);
  }, [tiketi, recentlyRatedTiket])

  return (
    <Container>
      <TiketiList>
        {tiketiToShow.map((item, index) => (
          <TiketContainer onClick={() => history.push(`/Tiketi/${item.index.toString()}`)}>
            <TiketTitle>{item.naslov}</TiketTitle>
            <TiketDescription>{item.opis}</TiketDescription>
            {item.isAnswered ? (<TiketPoslednjiOdgovor>Poslednji odgovor: {item.datumOdgovoraLekara}</TiketPoslednjiOdgovor>) : <></>}
            <TiketInfo>
              {/* <TiketDoktor>Doktor: {item.doctorName}</TiketDoktor> */}
              <TiketStatus>Status: {item.isAnswered ? "Odgovoren" : "Otvoren"}</TiketStatus>
              <TiketDatum>Datum kreiranja: {item.datumObjave}</TiketDatum>
            </TiketInfo>
          </TiketContainer>
        ))}
        {tiketiToShow.length === 0 && (
          <EmptyPage>Trenutno nema ni jednog otvorenog tiketa.</EmptyPage>
        )}
      </TiketiList>
    </Container>
  )
}

export default Tiketi