import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom'
import { getDoktoriThunk } from '../../../store/thunks/doktori';
import Loader from '../../Loader/Loader';
import { Description, DoktorContainer, DoktoriContainer, DoktorImage, DoktorIskustvo, DoktorNaziv, KlinikaContainer, Title } from './Klinika.styled';
import { Klinike } from './Mockupdata';

const getStringFromSpecijalizacija = (number) => {
    const numberString = number.toString();
    if (numberString === "1") {
        return "Neurologija"
    }
    if (numberString === "2") {
        return "Otorinolaringologija"
    }
    if (numberString === "3") {
        return "Hirurgija"
    }
    if (numberString === "4") {
        return "Psihijatrija"
    }
    if (numberString === "5") {
        return "Kardiologija"
    }
    if (numberString === "6") {
        return "Pedijatrija"
    }
}

export const Klinika = () => {
    const routeMatch = useRouteMatch();
    const history = useHistory();
    const [klinika, setKlinika] = useState();
    const [doktori, setDoktori] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const doktoriRedux = useSelector(state => state.doktori.doktori)
    const dispatch = useDispatch();

    const handleDoktor = (doktorID) => {
        history.push(`/Doktori/${doktorID}`)
    }

    useEffect(() => {
        dispatch(getDoktoriThunk());
    }, [])

    useEffect(() => {
        const klinikaM = Klinike.find(p => p.naziv === routeMatch.params.nazivKlinike.toString());
        setKlinika(klinikaM)
        if (doktoriRedux) {
            setDoktori(doktoriRedux.filter(item => item.specijalizacija === getStringFromSpecijalizacija(klinikaM.id)));
            setLoaded(true);
        }
    }, [doktoriRedux])
    if (!loaded) {
        return <Loader />
    }
    return (
        <KlinikaContainer>
            <Title>{klinika.naziv}</Title>
            <Description>{klinika.opis}</Description>
            <DoktoriContainer>
            {doktori.map(item => (
                <DoktorContainer onClick={() => handleDoktor(item.publicId)}>
                    <DoktorImage src={item.slika} />
                    <DoktorNaziv>{`${item.ime} ${item.prezime}`}</DoktorNaziv>
                </DoktorContainer>
            ))}
            </DoktoriContainer>
        </KlinikaContainer>
    )
}
