import React from 'react'
import { Link } from 'react-router-dom'
import { Bottom, Container, List, ListContainer, ListItem, ListTitle } from './Footer.styled'
import { IoLocationSharp } from "react-icons/io5"
import { MdPhoneEnabled, MdEmail } from "react-icons/md"
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn'

export const Footer = (props) => {
    const { isLoggedIn } = useIsLoggedIn();
    return (
        <Container isLoggedIn={isLoggedIn}>
            <ListContainer>
                <List>
                    <ListTitle>About</ListTitle>
                    <ListItem><Link to="/About">O klinici Health Appointment</Link></ListItem>
                    <ListItem><Link to="/Specijalizacije">Specijalizacije</Link></ListItem>
                    <ListItem><Link to="/Doktori">Doktori</Link></ListItem>


                </List>
                {!isLoggedIn ? (
                    <List>
                        <ListTitle>Account</ListTitle>
                        <ListItem><Link to="">Registrujte se</Link></ListItem>
                        <ListItem><Link to="">Prijavite se</Link></ListItem>
                    </List>
                ) : (
                    <></>
                )}
                <List>
                    <ListTitle>Contact</ListTitle>
                    <ListItem><IoLocationSharp size={16} />Aleksandra Medvedeva 14, 18115 Niš, Srbija</ListItem>
                    <ListItem><MdPhoneEnabled size={16} /> 018 - 180/000</ListItem>
                    <ListItem><MdEmail size={16} /> office@hp.org</ListItem>
                </List>
                <Bottom>
                    @2022 Copyright, SWE Доктори
                </Bottom>
            </ListContainer>

        </Container>
    )
}
