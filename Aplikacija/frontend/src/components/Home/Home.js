import { Container, CTABiggerText, CTAButton, CTAButtonContainer, CTABUttonContainer, CTAContainer, CTAInnerContainer, CTASmallerText, CTATextContainer, Image, Section, SectionContent, SectionImage, SectionText, SectionTitle } from "./Home.styled"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useNavigation } from 'react-router-dom'
import { loginPacijentThunk } from "../../store/thunks/pacijent";
import doctorsImage from "../../assets/home/doctors.jpg"
import platformImage from "../../assets/home/platformImage.jfif"
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { useState } from "react";
import Loader from "../Loader/Loader";


export const Home = (props) => {
    const dispatch = useDispatch();
    const pacijent = useSelector(state => state.pacijent);
    const history = useHistory();
    // const navigation = useNavigation();
    const handleClick = () => {
        history.push("/Login");
    }
    const { isLoggedIn, isPacijent } = useIsLoggedIn();
    if (isLoggedIn) {
            return (<Redirect to="/Tiketi" />)
    }

    return (
        <Container >
            <CTAContainer>
                <CTAInnerContainer>
                    <CTATextContainer>
                        <CTABiggerText>
                            Ne osecate se najbolje?
                        </CTABiggerText>
                        <CTASmallerText>
                            Prijavite se na najbolju kliniku u Srbiji i lako ostvarite komunikaciju sa doktorom na najboljoj E-Klinici u Srbiji
                        </CTASmallerText>
                    </CTATextContainer>
                    <CTAButtonContainer>
                        <CTAButton onClick={handleClick}>
                            PRIJAVITE SE
                        </CTAButton>
                    </CTAButtonContainer>

                </CTAInnerContainer>
            </CTAContainer>
            <Section>
                <SectionImage><Image src={doctorsImage} width={500} />   </SectionImage>
                <SectionContent>
                    <SectionTitle>Najbolji doktori sa vama</SectionTitle>
                    <SectionText>
                        Sa vama su doktori specijalizanti sa dugogodišnjim iskustvima koji su uvek spremni da pomognu.
                    </SectionText>
                </SectionContent>
            </Section>
            <hr />
            <br />
            <Section>
                <SectionImage><Image src={platformImage} width={500} />   </SectionImage>
                <SectionContent>
                    <SectionTitle>Brza i efikasna usluga</SectionTitle>
                    <SectionText>
                        Brzo i efikasno kontaktirajte svog odabranom lekara. Prva platforma koja nudi privatan chat sa doktorom u bilo koje doba dana. Brzo i lako zakazite preglede i odrzite kontakt sa doktorom.
                    </SectionText>
                </SectionContent>
            </Section>
        </Container>
    )
}