import styled from "styled-components";

export const DoktorContainer = styled.div`
    width: 50%;
    margin: 50px auto;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 0 5px 1px gray;
    min-height: 60vh;
    padding: 20px;
    & div {
        margin: 30px;
    }
    @media (max-width: 768px) {
        width: 80%;
    }
`
export const DoktorNaziv = styled.div`

`
export const DoktorGodiste = styled.div``
export const DoktorIskustvo = styled.div``
export const DoktorSpecijalizacija = styled.div``
export const DoktorOcena = styled.div``
export const DoktorBiografija = styled.div``