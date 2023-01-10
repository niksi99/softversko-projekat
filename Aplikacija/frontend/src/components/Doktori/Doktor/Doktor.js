import React, { useEffect, useState } from 'react'
import { Redirect, useRouteMatch } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import {useSelector, useDispatch} from "react-redux";
import { DoktorNaziv } from '../Doktori.styled'
import { DoktoriData } from '../Mockupdata'
import { DoktorBiografija, DoktorContainer, DoktorGodiste, DoktorIskustvo, DoktorOcena, DoktorSpecijalizacija } from './Doktor.styled'
import { getDoktoriThunk } from '../../../store/thunks/doktori';
import { DoktorImage } from '../../Klinike/Klinika/Klinika.styled';

export const Doktor = () => {
    const routeMatch = useRouteMatch();
    const [doktor, setDoktor] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [notFound, setNotFound ] = useState(false);
    const doktoriRedux = useSelector(state => state.doktori.doktori);
    const dispatch = useDispatch();
    useEffect(() => {
        const doktorID = routeMatch.params.doktorID;
        if (!doktoriRedux) {
            dispatch(getDoktoriThunk());
        } else {
            let doktorNew = doktoriRedux.find(item => item.publicId.toString() === doktorID.toString())
            if (doktorNew) {

                setDoktor(doktorNew);
            } else {
                setNotFound(true);
            }
        }
        setLoaded(true);
    }, [doktoriRedux])

    useEffect(() => {
        console.log(doktor);
    }, [doktor])

    if (notFound) {
        return <Redirect to="/NotFoundPage" />
    }

    if (!loaded) {
        return <Loader/>
    }
  return (
    <DoktorContainer>
        <DoktorNaziv>
            {`${doktor.ime} ${doktor.prezime}`}
        </DoktorNaziv>
        <hr/>
        <DoktorImage src={doktor.slika} />
        <DoktorSpecijalizacija>Specijalizacija: {doktor.specijalizacija}</DoktorSpecijalizacija>
        <DoktorBiografija>Biografija: {doktor.biografija}</DoktorBiografija>

        <DoktorOcena>Prosecna ocena: {doktor.prosecnaOcena}</DoktorOcena>
    </DoktorContainer>
  )
}
