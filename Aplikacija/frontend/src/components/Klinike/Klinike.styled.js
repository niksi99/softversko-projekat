import styled from "styled-components"
import neurologijaImage from "../../assets/klinike/neurologija.jpeg";
import otorinolaringologijaImage from "../../assets/klinike/otorinolaringologija.jpg";
import hirurgijaImage from "../../assets/klinike/hirurgija.jpg";
import psihijatrijaImage from "../../assets/klinike/psihijatrija.jpg";
import kardiologijaImage from "../../assets/klinike/kardiologija.jpg";
import pedijatrijaImage from "../../assets/klinike/pedijatrija.jpg";


export const KlinikeContainer = styled.div`
    margin: 0 50px;
    height: 100%;
`
export const KlinikaContainer = styled.div`
    box-shadow: 0 0 5px 1px gray;
    margin: 40px 0;
    text-align: center;
    height: 300px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    @media (max-width: 768px) {
        flex-direction: column-reverse;
    }
`
export const KlinikaTitle = styled.div`
    font-size: 22px;
    font-weight: bold;
`
export const KlinikaImageNeurologija = styled.div`
    flex: 10;
    background-image: url(${neurologijaImage});
    background-position: 0 -50px;
    background-size: cover;
    background-repeat: no-repeat;
    @media (max-width: 1440px) {
        background-position: 0;
    }
`
export const KlinikaImageOtorinolaringologija = styled.div`
    flex: 10;
    background-image: url(${otorinolaringologijaImage});
    background-position: 0 -200px;
    background-size: cover;
    background-repeat: no-repeat;
    @media (max-width: 1440px) {
        background-position: 0 -120px;
    }
    @media (max-width: 1024px) {
        background-position: 0 -0px;
    }
    @media (max-width: 768px) {
        background-position: 0;
        flex: 10;
    }
`
export const KlinikaImagePsihijatrija = styled.div`
    flex: 10;
    background-image: url(${psihijatrijaImage});
    background-position: 0 -50px;
    background-size: cover;
    background-repeat: no-repeat;
    @media (max-width: 850px) {
        background-position: 0;
    }
`
export const KlinikaImageHirurgija = styled.div`
    flex: 10;
    background-image: url(${hirurgijaImage});
    background-position: 0 -150px;
    background-size: cover;
    background-repeat: no-repeat;
    @media (max-width: 1440px) {
        background-position: 0;
    }
`
export const KlinikaImageKardiologija = styled.div`
    flex: 10;
    background-image: url(${kardiologijaImage});
    background-position: 0 -190px;
    background-size: cover;
    background-repeat: no-repeat;
    @media (max-width: 1200px) {
        background-position: 0 -100px;
    }
    @media (max-width: 1000px) {
        background-position: 0 -60px;
    }
    @media (max-width: 900px) {
        background-position: 0 -10px;
    }
`
export const KlinikaImagePedijatrija = styled.div`
    flex: 10;
    background-image: url(${pedijatrijaImage});
    background-position: 0 -120px;
    background-size: cover;
    background-repeat: no-repeat;
    @media (max-width: 1200px) {
        background-position: 0 -80px;
    }
    @media (max-width: 1000px) {
        background-position: 0 -40px;
    }
    @media (max-width: 850px) {
        background-position: 0;
    }
`

export const KlinikaDescription = styled.div`
    margin-top: 20px;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
`
export const KlinikaContent = styled.div`
    flex: 4;
    padding-top: 40px;
    @media (max-width: 768px) {
        padding-top: 10px;
    }
`
