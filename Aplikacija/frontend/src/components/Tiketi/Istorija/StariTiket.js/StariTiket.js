import React, { useEffect, useState } from 'react'
import { Redirect, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useIsLoggedIn } from '../../../../hooks/useIsLoggedIn'
import Loader from '../../../Loader/Loader';
import { AiFillEdit, AiOutlineMail, AiOutlineStar, AiFillStar } from "react-icons/ai"
import { Container, IconEdit, MessageIcon, Rate, Star, SubmitButton, TiketContainer, TiketContent, TiketDatum, TiketDescription, TiketDescriptionEdit, TiketDoktor, TiketDoktorOdgovor, TiketEditContent, TiketInfo, TiketPoslednjiOdgovor, TiketRelativeContainer, TiketSelect, TiketStatus, TiketTitle, TiketTitleEdit } from './StariTiket.styled'
import { useDispatch, useSelector } from 'react-redux';
import { vratiDoktoreSpecijalizante } from '../../../../store/thunks/doktor';
import { answerTicket, forwardTicket, getTiketiDoktorThunk, getTiketiPacijentThunk, rateDoktorThunk } from '../../../../store/thunks/tiket';

const StariTiket = () => {
    const { isPacijent, loaded, isSpecijalizant } = useIsLoggedIn();
    const [isValidId, setIsValidId] = useState(0);
    const dispatch = useDispatch();
    const kolege = useSelector(state => state.doktor.kolege);
    const userId = useSelector(state => state.user.userId);
    // 0 - loading, 1 - successfully loaded, 2 - error
    const [tiket, setTiket] = useState({});
    const routeMatch = useRouteMatch();
    const tiketi = useSelector(state => state.tiketi.tiketi)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectOption, setSelectOption] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const history = useHistory();
    const loadedDetails = useSelector(state => state.loader.loader);
    const [initial, setInitial] = useState(true);
    const [mouseHover, setMouseHover] = useState(0);
    const pacijent = useSelector(state => state.pacijent.podaci);
    const doktor = useSelector(state => state.doktor.podaci);
    const [pacijentIme, setPacijentIme] = useState("");
    const [doktorIme, setDoktorIme] = useState("");
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        const tiketId = routeMatch.params.tiketId;
        const tiketDetails = tiketi[tiketId]
        if (loadedDetails.length === 0) {
            if (tiketDetails === undefined) {
                if (loaded) {
                    if (isPacijent) {
                        dispatch(getTiketiPacijentThunk(userId))
                    } else {
                        dispatch(getTiketiDoktorThunk(userId, isSpecijalizant));
                    }
                    setIsFetched(true);

                }

            } else {
                setTiket(tiketDetails);
                if (isPacijent) {
                    setPacijentIme(`${pacijent.ime} ${pacijent.prezime}`);
                    setDoktorIme(tiketDetails.doktorIme);
                } else {
                    setPacijentIme(tiketDetails.pacIme);
                    setDoktorIme(`${doktor.ime} ${doktor.prezime}`)
                }
                setMouseHover(tiketDetails.ocena)
                setIsValidId(1);
            }
        }

    }, [routeMatch, tiketi, loadedDetails])

    useEffect(() => {
        dispatch(vratiDoktoreSpecijalizante());
    }, [])
    useEffect(() => {
        const tiketID = routeMatch.params.tiketId;
        setTiket(tiketi[tiketID])
        setIsValidId(1);
        if (isFetched && !tiketi[tiketID]) {
            setIsValidId(2)
        }
    }, [tiketi, isFetched])

    useEffect(() => {
        if (tiket.answer) {
            setDescription(tiket.odgovorLekara);
        }
    }, [tiket])

    const handleMessage = (recieverId) => {
        history.push(`/Messages/${recieverId}`)
    }

    if (isValidId === 0) {
        return <Loader />
    }
    if (isValidId === 2) {
        return <Redirect to="/NotFoundPage" />

    }
    return (
        <Container>
            <TiketContainer>
                <TiketContent>
                    <TiketDoktorOdgovor>{pacijentIme}</TiketDoktorOdgovor>
                    <TiketTitle>{tiket.naslov}</TiketTitle>
                    <TiketDescription>{tiket.opis}</TiketDescription>
                </TiketContent>
                {isPacijent ? (<></>) : (
                    <MessageIcon onClick={() => handleMessage(tiket.pacPublicId)}>
                        <AiOutlineMail fontSize={"20px"} />
                    </MessageIcon>
                )}

                <TiketInfo>
                    <TiketDatum>{tiket.datumObjave}</TiketDatum>
                    <TiketDoktor>{tiket.doctorName}</TiketDoktor>
                    <TiketStatus>{tiket.isAnswered ? "Odgovoren" : "Otvoren"}</TiketStatus>
                </TiketInfo>

                <React.Fragment>
                    <hr />

                    <TiketRelativeContainer>
                        {isPacijent ? (
                            <IconEdit onClick={() => handleMessage(tiket.doktorPublicId)}>
                                <AiOutlineMail fontSize={"20px"} />
                            </IconEdit>) :
                            (<></>)}
                        <TiketContent>
                            <TiketDoktorOdgovor>{doktorIme}</TiketDoktorOdgovor>
                            <TiketDescription>{tiket.odgovorLekara}</TiketDescription>
                        </TiketContent>
                        <TiketPoslednjiOdgovor>{tiket.datumOdgovoraLekara}</TiketPoslednjiOdgovor> (
                        <Rate>
                            <Star>
                                {mouseHover >= 1 ? (
                                    <AiFillStar />
                                ) : (
                                    <AiOutlineStar />
                                )}
                            </Star>
                            <Star>
                                {mouseHover >= 2 ? (
                                    <AiFillStar />
                                ) : (
                                    <AiOutlineStar />
                                )}
                            </Star>
                            <Star>
                                {mouseHover >= 3 ? (
                                    <AiFillStar />
                                ) : (
                                    <AiOutlineStar />
                                )}
                            </Star>
                            <Star>
                                {mouseHover >= 4 ? (
                                    <AiFillStar />
                                ) : (
                                    <AiOutlineStar />
                                )}
                            </Star>
                            <Star>
                                {mouseHover >= 5 ? (
                                    <AiFillStar />
                                ) : (
                                    <AiOutlineStar />
                                )}
                            </Star>
                        </Rate>


                    </TiketRelativeContainer>
                </React.Fragment>
            </TiketContainer >
        </Container >
    )
}

export default StariTiket