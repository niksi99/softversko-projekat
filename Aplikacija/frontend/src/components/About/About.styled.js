import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    padding-top: 30px;
`
export const Section = styled.div`
    border-bottom: 1px solid whitesmoke;
    padding: 50px;
    @media (max-width: 768px) {
        padding: 10px;
        padding-bottom: 50px;
    }
`
export const SectionImage = styled.div`
    padding: 0 300px;
    text-align: center;

    @media (max-width: 1200px) {
        padding: 0 200px;
    }
    @media (max-width: 1000px) {
        padding: 0 100px;
    }
    @media (max-width: 768px) {
        padding: 0 50px;
    }
`
export const SectionContent = styled.div`

`
export const SectionTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 40px;
    @media (max-width: 768px) {
        padding-bottom: 15px;
    }
`
export const SectionText = styled.div`
    text-align: center;
    padding-top: 10px;
    font-size: 20px;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`
export const Image = styled.img`
    border-radius: 5px;
    box-shadow: 0 0 10px 1px gray;
    width: 100%;
    height: 100%;
    object-fit: fill;
`