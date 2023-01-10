import styled from "styled-components";

export const KlinikaContainer = styled.div`

`
export const DoktoriContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    /* @media (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    } */
`
export const DoktorContainer = styled.div`
    box-shadow: 0 0 5px 1px gray;
    flex: 1;
    min-width: 200px;
    max-width: 260px;
    min-height: 240px;
    max-height: 240px;
    text-align: center;
    padding-top: 40px;
    margin: 30px;
    cursor: pointer;
    
`
export const DoktorNaziv = styled.div`
    font-weight: bold;
    font-size: 18px;
`
export const DoktorIskustvo = styled.div`
    font-size: 14px;
    margin-top: 10px;
`
export const Title = styled.div`
    text-align: center;
    font-weight: bold;
    width: 100%;
    font-size: 22px;
`
export const Description = styled.div`
    text-align: center;
    font-size: 18px;
`
export const DoktorImage = styled.img`
    width: 150px;
    height: 150px;
`
