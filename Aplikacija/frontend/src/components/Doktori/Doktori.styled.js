import styled from "styled-components";

export const ComponetContainer = styled.div`
    height: 100%;
`
export const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    flex: 1;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`
export const DoktoriContainer = styled.div`
    display: flex;
    overflow-y: scroll;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 10;
    @media (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    }
`
export const DoktorContainer = styled.div`
    box-shadow: 0 0 5px 1px gray;
    height: 240px;
    text-align: center;
    width: 200px;
    padding-top: 40px;
    margin: 30px;
    cursor: pointer;
    /* flex: 1; */
    @media (max-width: 768px) {
        padding-top: 20px;
        padding-bottom: 20px;
        min-width: 250px;
    }
`
export const DoktorNaziv = styled.div`
    font-weight: bold;
    font-size: 18px;
`
export const DoktorIskustvo = styled.div`
    font-size: 14px;
    margin-top: 10px;
`
export const FilterContainer = styled.div`
    flex: 2;
    border: 1px solid black;
    position: relative;
    box-sizing: border-box;
    padding-top: 40px;
    min-height: 400px;
    @media (max-width: 1400px) {
        flex: 4;
    }
    @media (max-width: 1000px) {
        flex: 5;
    }
    @media (max-width: 768px) {
        min-height: 130px;
        display: flex;
        flex-direction: row;
        padding-top: 5px;
    }
`
export const FiltersButton = styled.div`
    width: 80%;
    height: 40px;
    color: #3d8bfd;
    border: 2px solid #3d8bfd;
    border-radius: 4px;
    cursor: pointer;
    padding-top: 8px;
    text-align: center;
    font-weight: bold;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin-left: auto; 
  margin-right: auto;
    &:hover {
        background-color: #3d8bfd;
        color: white;
    }
`
export const FilterCategory = styled.div`
    text-align: center;
    padding-bottom: 10px;
    @media (max-width: 768px) {
        padding-bottom: 0;
    }
`
export const FilterSelect = styled.select`
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 100px;
    height: 30px;
`
export const FilterGroup = styled.div`
    flex: 1;
    height: 70px;
`