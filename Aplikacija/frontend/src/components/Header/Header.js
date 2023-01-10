import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { useDimensions } from "../../hooks/useDimensions";
import { loginDoktorThunk } from "../../store/thunks/doktor";
import { loginPacijentThunk } from "../../store/thunks/pacijent";
import { logoutThunk } from "../../store/thunks/user";
import { Container, List, ListItem, LogoText, MobileIconTools, MobileIconUser, SlideDown } from "./Header.styled"
import { HiOutlineUserCircle, HiUser } from "react-icons/hi"
import { IoReorderThree } from "react-icons/io5"
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import "./styles.css"
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';

export const Header = ({ props }) => {

    const { width, height } = useDimensions();
    const dispatch = useDispatch();
    const history = useHistory();
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = (event) => {
        event.stopPropagation();
        setIsActive(!isActive);
    }
    const { isLoggedIn, isPacijent } = useIsLoggedIn();
    const handleLogout = () => {
        dispatch(logoutThunk());
        history.replace("/")
    }
    const handleLogin = () => {
        history.push("/Login");
    }
    return (
        <Container>
            <LogoText>
                <NavLink to="/">Health Appointment</NavLink>
            </LogoText>

            {width > 768 ? (
                <List isLoggedIn={isLoggedIn}>
                    <ListItem>
                        {!isLoggedIn ? (
                            <NavLink to="/">Home</NavLink>
                        ) : (<NavLink to="/Tiketi">Home</NavLink>)}
                    </ListItem>
                    <ListItem>
                        <NavLink to="/About">O klinici</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/Specijalizacije">Specijalizacije</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/Doktori">Doktori</NavLink>
                    </ListItem>
                    {isLoggedIn ?
                        (<React.Fragment>
                            <ListItem>
                                <HiOutlineUserCircle onClick={onClick} color="white" size={24} style={{ position: "relative", top: "6px", cursor: "pointer" }} />
                                <nav
                                    ref={dropdownRef}
                                    className={`menu ${isActive ? "active" : "inactive"}`}
                                >
                                    <ul>
                                        {isPacijent && (
                                            <li onClick={() => setIsActive(false)}>
                                                <NavLink to="/PostaviSimptome">Postavi simptome</NavLink>
                                            </li>
                                        )}
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/Tiketi">Tiketi</NavLink>
                                        </li>
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/Messages">Poruke</NavLink>
                                        </li>
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/Profil">Profil</NavLink>
                                        </li>

                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/Istorija">Istorija tiketa</NavLink>
                                        </li>

                                        <li onClick={() => setIsActive(false)}>
                                            <a style={{ cursor: "pointer" }} onClick={handleLogout} >Logout</a>
                                        </li>
                                    </ul>
                                </nav>
                            </ListItem>
                        </React.Fragment>
                        ) : (
                            <ListItem>
                                <span style={{ fontWeight: "bold" }} onClick={handleLogin}>Login</span>
                            </ListItem>)}

                </List>
            ) : (
                <React.Fragment>
                    {isLoggedIn ?
                        (<React.Fragment>
                            <MobileIconUser>
                                <HiOutlineUserCircle onClick={onClick} color="white" size={24} style={{ position: "relative", top: "6px", cursor: "pointer" }} />
                                <nav
                                    ref={dropdownRef}
                                    className={`menu ${isActive ? "active" : "inactive"}`}
                                >
                                    <ul>
                                        {isPacijent && (
                                            <li onClick={() => setIsActive(false)}>
                                                <NavLink to="/PostaviSimptome">Postavi simptome</NavLink>
                                            </li>
                                        )}
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/Tiketi">Tiketi</NavLink>
                                        </li>
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/Profil">Profil</NavLink>
                                        </li>
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/Messages">Poruke</NavLink>
                                        </li>
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/Istorija">Istorija tiketa</NavLink>
                                        </li>

                                        <li onClick={() => setIsActive(false)}>
                                            <a style={{ cursor: "pointer" }} onClick={handleLogout} >Logout</a>
                                        </li>
                                    </ul>
                                </nav>
                            </MobileIconUser>
                        </React.Fragment>
                        ) : (
                            <MobileIconTools>
                                <IoReorderThree onClick={onClick} color="white" size={24} style={{ position: "relative", top: "6px", cursor: "pointer" }} />

                                <nav
                                    ref={dropdownRef}
                                    className={`menu ${isActive ? "active" : "inactive"}`}
                                >
                                    <ul>
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/">Home</NavLink>
                                        </li>
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/About">O klinici</NavLink>
                                        </li>
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/Specijalizacije">Specijalizacije</NavLink>
                                        </li>
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/Doktori">Doktori</NavLink>
                                        </li>
                                        <li onClick={() => setIsActive(false)}>
                                            <NavLink to="/Login">Login</NavLink>
                                        </li>
                                    </ul>
                                </nav>
                            </MobileIconTools>)}
                </React.Fragment>
            )}
        </Container>
    )
}