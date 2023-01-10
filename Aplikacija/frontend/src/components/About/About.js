import React from "react"
import { Link } from "react-router-dom"
import doctorsImage from "../../assets/home/doctors.jpg"
import machinesImage from "../../assets/home/machines.jpg"
import nurseImage from "../../assets/home/nurse.webp"
import platformImage from "../../assets/home/platformImage.jfif"
import { Container, Image, Section, SectionContent, SectionImage, SectionText, SectionTitle } from "./About.styled"

export const About = ({ props }) => {
    return (
        <Container>
            <Section>

                <SectionContent>
                    <SectionTitle>
                        Health appointment klinika
                    </SectionTitle>
                    <SectionText>
                        Health appointment je elektronska klinika koja pruza pacijentima usluge lecenja elektronskim putem. Preko platforme se mogu postaviti simptomi koje doktori mogu da vide i da zakažu pregled, ili da otvore direktnu komunikaciju sa pacijentom. Doktori mogu izdavati elektronske recepte putem platforme, kao i davati upute pacijentima kod doktora specijalizanta.
                    </SectionText>
                </SectionContent>
            </Section>

            <Section>
                <SectionTitle>
                    Kolektiv
                </SectionTitle>
                <SectionImage>
                    <Image src={doctorsImage} />
                </SectionImage>
                <SectionContent>
                    <SectionText>
                        Doktori koji čine naš kolektiv imaju dugogodišnjih iskustva u raznim oblastima. Svaki od doktora imaju svoje recenzije koje su dostupne svima, tako da možete imati u uvid kakav je doktor kada idete na pregled.
                    </SectionText>
                </SectionContent>
            </Section>
            <Section>
                <SectionTitle>
                    Uredjaji
                </SectionTitle>
                <SectionImage>
                    <Image src={machinesImage} />
                </SectionImage>
                <SectionContent>
                    <SectionText>
                        Posedujemo najnovije uredjaje i aparate koje su laboratorijski ispitane za najbezbolnije lečenje. Mašine se redovno čiste i saniciraju posle svakog korišćenja. Higijena nam je najbitnija.
                    </SectionText>
                </SectionContent>
            </Section>
            <Section>
                <SectionTitle>
                    Nasmejana usluga
                </SectionTitle>
                <SectionImage>
                    <Image src={nurseImage} />
                </SectionImage>
                <SectionContent>
                    <SectionText>
                        Razumemo tezgobe koje pacijenti mogu da imaju, samim tim uvek pokušavamo da donesemo veselu atmosferu. Kod nas vas očekuju nasmejani radnici koji su uvek tu za vas.
                    </SectionText>
                </SectionContent>
            </Section>
        </Container>
    )
}