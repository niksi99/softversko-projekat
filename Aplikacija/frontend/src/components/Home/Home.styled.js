import styled from "styled-components";
import pic from "../../assets/home/ctaBackground3.jpg"

export const Container = styled.div`
    margin-left: 0;
    padding-left: 0;
`
export const CTAContainer = styled.div`
    background-color: #6ea8fe;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 550px;
    background-image: url(${pic});
    background-position: 0px 550px;
    object-fit: cover;
`
export const CTAInnerContainer = styled.div`
    background-color: rgba(110, 168, 254, 0.85);
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
`
export const CTABiggerText = styled.div`
    color: white;
    font-size: 24px;
    text-align: center;
    letter-spacing: 0.3px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 180px;
`
export const CTASmallerText = styled.div`
    text-align: center;
    color: white;
    padding: 0 80px;
    padding-top: 15px;
    font-size: 18px;
`
export const CTAButton = styled.button`
    background-color: #084298;
    border: 0;
    padding: 12px 80px;
    letter-spacing: 0.5px;
    padding-top: 11px;
    font-weight: bold;
    color: white;
    font-size: 16px;
    border-radius: 30px;
    cursor: pointer;
    display: block;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
`
export const CTATextContainer = styled.div`
    flex: 1;
`
export const CTAButtonContainer = styled.div`
    flex: 1;
`

export const Section = styled.div`
    width: 100%;
    height: 300px;
    padding: 30px;
    display: flex;
    & * {
        text-align: center;
    }
    &:nth-child(even) {
        flex-direction: row;
    }
    &:nth-child(odd) {
        flex-direction: row-reverse;
    }
    @media (max-width: 768px) {
        flex-direction: column;
        &:nth-child(even) {
            flex-direction: column;
        }
        &:nth-child(odd) {
            flex-direction: column;
        }
        height: auto;
    }
`
export const SectionImage = styled.div`
    flex: 1;
`
export const SectionContent = styled.div`
    flex: 1;
`
export const Image = styled.img`
    width: 400px;
    height: 250px;
    border-radius: 5px;
    box-shadow: 0 0 10px 1px gray;
    object-fit: fill;
    @media (max-width: 768px) {
        width: 300px;
    }
`
export const SectionTitle = styled.div`
    font-weight: bold;
    padding-top: 50px;
`
export const SectionText = styled.div`
    padding: 10px 40px;
`