import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { ComponetContainer, DoktorContainer, DoktoriContainer, DoktorIskustvo, DoktorNaziv, FilterCategory, FilterContainer, FilterGroup, FiltersButton, FilterSelect, FlexContainer } from './Doktori.styled'
import { getDoktoriThunk } from '../../store/thunks/doktori';
import { DoktorImage } from '../Klinike/Klinika/Klinika.styled';

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

export const Doktori = () => {
  const [doktori, setDoktori] = useState([]);
  const loader = useSelector(state => state.loader.loader);
  const [loaded, setLoaded] = useState(false);
  const [specijalizacija, setSpecijalizacija] = useState(0);
  const [sort, setSort] = useState(0)
  const doktoriRedux = useSelector(state => state.doktori.doktori)
  const history = useHistory();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDoktoriThunk());
  }, [])
  useEffect(() => {
    if (doktoriRedux && loader.length === 0) {
      setDoktori(doktoriRedux);
      setLoaded(true);
    }
  }, [doktoriRedux, loader])

  const handleDoktor = (doktorID) => {
    history.push(`/Doktori/${doktorID}`);
  }
  const handleSpecijalizacija = (event) => {
    setSpecijalizacija(event.target.value)
  }
  const handleSort = (event) => {
    setSort(event.target.value)
  }
  const handleFilters = () => {
    console.log("specijalizacija: ", specijalizacija)
    console.log("param: ", getStringFromSpecijalizacija(specijalizacija));
    console.log("doktoriRedux: ", doktoriRedux)
    let newDoktori = doktoriRedux.filter(item => item.specijalizacija === getStringFromSpecijalizacija(specijalizacija));
    if (specijalizacija === 0 || specijalizacija === "0") {
      newDoktori = doktoriRedux;
    }
    console.log(specijalizacija);

    if (sort === 1) {
      for (let i = 0; i < newDoktori.length; i++) {
        let ind = i;
        for(let j = 0; j < newDoktori.length; j++) {
          if (newDoktori[ind].ocene > newDoktori[j].ocene) {
            ind = j;
          }
        }
        let temp = newDoktori[ind];
        newDoktori[ind] = newDoktori[i];
        newDoktori[i] = temp;
      }
    } else if (sort === 2) {
      for (let i = 0; i < newDoktori.length; i++) {
        let ind = i;
        for(let j = 0; j < newDoktori.length; j++) {
          if (newDoktori[ind].ocene < newDoktori[j].ocene) {
            ind = j;
          }
        }
        let temp = newDoktori[ind];
        newDoktori[ind] = newDoktori[i];
        newDoktori[i] = temp;
      }
    }

    setDoktori([...newDoktori]);
  }

  if (!loaded) {
    return <Loader />
  }
  return (

    <ComponetContainer>
      <FlexContainer>
        <FilterContainer>
          <FilterGroup>
            <FilterCategory>Specijalizacija</FilterCategory>
            <FilterSelect onChange={handleSpecijalizacija} defaultValue={0}>
              <option value={0}>Izaberite specijalizaciju</option>
              <option value={1}>Neurologija</option>
              <option value={2}>Otarinolaringologija</option>
              <option value={3}>Hirurgija</option>
              <option value={4}>Psihijatrija</option>
              <option value={5}>Kardiologija</option>
              <option value={6}>Pedijatrija</option>
            </FilterSelect>
          </FilterGroup>
          <FilterGroup>
            <FilterCategory>Sortiraj</FilterCategory>
            <FilterSelect onChange={handleSort} defaultValue={0}>
              <option value={0}>Izaberite opciju</option>
              <option value={1}>Recenzija opadajuce</option>
              <option value={2}>Recenzija rastuce</option>
            </FilterSelect>
          </FilterGroup>

          <FiltersButton onClick={handleFilters}>
            PRIMENI FILTERE
          </FiltersButton>
        </FilterContainer>
        <DoktoriContainer>
          {doktori.map(item => (
            <DoktorContainer onClick={() => handleDoktor(item.publicId)}>
              <DoktorImage src={item.slika} />
              <DoktorNaziv>{`${item.ime} ${item.prezime}`}</DoktorNaziv>
            </DoktorContainer>
          ))}
        </DoktoriContainer>
      </FlexContainer>
    </ComponetContainer>


  )
}
