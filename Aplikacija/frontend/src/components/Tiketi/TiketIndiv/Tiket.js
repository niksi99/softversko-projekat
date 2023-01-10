import React, { useEffect, useState } from 'react'
import { Redirect, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useIsLoggedIn } from '../../../hooks/useIsLoggedIn'
import Loader from '../../Loader/Loader';
import { Mockupdata } from '../Mockupdata';
import { AiFillEdit, AiOutlineMail, AiOutlineStar, AiFillStar } from "react-icons/ai"
import { Container, IconEdit, MessageIcon, Rate, Star, SubmitButton, TiketContainer, TiketContent, TiketDatum, TiketDescription, TiketDescriptionEdit, TiketDoktor, TiketDoktorOdgovor, TiketEditContent, TiketInfo, TiketPoslednjiOdgovor, TiketRelativeContainer, TiketSelect, TiketStatus, TiketTitle, TiketTitleEdit } from './Tiket.styled'
import { useDispatch, useSelector } from 'react-redux';
import { vratiDoktoreSpecijalizante } from '../../../store/thunks/doktor';
import { answerTicket, forwardTicket, getTiketiDoktorThunk, getTiketiPacijentThunk, rateDoktorThunk } from '../../../store/thunks/tiket';
import { addTiketRated } from '../../../store/actions/tiketi';

const Tiket = () => {
    const { isPacijent, loaded, isSpecijalizant } = useIsLoggedIn();
    const [isValidId, setIsValidId] = useState(0);
    const dispatch = useDispatch();
    const kolege = useSelector(state => state.doktor.kolege);
    const userId = useSelector(state => state.user.userId);
    // 0 - loading, 1 - successfully loaded, 2 - error
    const [tiket, setTiket] = useState({});
    const [tiketID, setTiketID] = useState(0);
    const pacijent = useSelector(state => state.pacijent.podaci);
    const doktor = useSelector(state => state.doktor.podaci);
    const routeMatch = useRouteMatch();
    const tiketi = useSelector(state => state.tiketi.tiketi)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectOption, setSelectOption] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const history = useHistory();
    const loadedDetails = useSelector(state => state.loader.loader);
    const [initial, setInitial] = useState(false);
    const [mouseHover, setMouseHover] = useState(0);
    const [pacijentIme, setPacijentIme] = useState("");
    const [doktorIme, setDoktorIme] = useState("");
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        const tiketId = routeMatch.params.tiketId;
        const tiketDetails = tiketi[tiketId];
        setTiketID(tiketId)
        if (loadedDetails.length === 0) {
            if (tiketDetails === undefined) {
                if (loaded) {
                    if (!isFetched) {
                        if (isPacijent) {
                            dispatch(getTiketiPacijentThunk(userId))
                        } else {
                            dispatch(getTiketiDoktorThunk(userId, isSpecijalizant));
                        }
                        setIsFetched(true);
                    }
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
                setIsValidId(1);
            }
        }

    }, [routeMatch, tiketi, loadedDetails])

    useEffect(() => {
        setTiket(tiketi[tiketID])
        setIsValidId(1);
        if (isFetched && !tiketi[tiketID]) {
            setIsValidId(2)
        }
    }, [tiketi, isFetched])

    useEffect(() => {
        if (tiket?.naslov) {
            setIsValidId(1);
        } else {
            setIsValidId(0);
        }
    }, [tiket])

    useEffect(() => {
        dispatch(vratiDoktoreSpecijalizante());
    }, [])
    useEffect(() => {
        if (loaded) {
            if (isPacijent) {
                dispatch(getTiketiPacijentThunk(userId))
            } else {
                dispatch(getTiketiDoktorThunk(userId));
            }
            setInitial(true);
        }
    }, [loaded, isPacijent])

    useEffect(() => {
        if (tiket?.answer) {
            setDescription(tiket?.odgovorLekara);
        }
    }, [tiket])


    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleChangeSelect = (event) => {
        setSelectOption(event.target.value)
        console.log(event.target.value)
    }
    const handleEdit = (event) => {
        setIsEditing(true);
    }
    const handleAnswer = () => {
        // const tiketLocal = tiket;
        // tiketLocal.answer.description = description;
        // setTiket(tiketLocal);
        setIsEditing(false);
        dispatch(answerTicket(tiket.id, userId, description));
        setIsValidId(0);
    }
    const handleForward = () => {
        dispatch(forwardTicket(selectOption, tiket.id, userId, routeMatch.params.tiketId))
        history.replace("/Tiketi");
    }

    const handleMessage = (recieverId) => {
        history.push(`/Messages/${recieverId}`)
        // console.log(tiket);
    }
    const rateDoktor = (rate) => {
        console.log(rate);
        const IDDok = tiket.idDoktor;
        const IDObj = tiket.id;
        const Ocena = rate;
        dispatch(rateDoktorThunk(IDDok, IDObj, Ocena, userId));
        // dispatch(addTiketRated(tiket));
        history.replace("/Tiketi");
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
                    <TiketTitle>{tiket?.naslov}</TiketTitle>
                    <TiketDescription>{tiket?.opis}</TiketDescription>
                </TiketContent>
                {isPacijent ? (<></>) : (
                    <MessageIcon onClick={() => handleMessage(tiket?.pacPublicId)}>
                        <AiOutlineMail fontSize={"20px"} />
                    </MessageIcon>
                )}

                <TiketInfo>
                    <TiketDatum>{tiket?.datumObjave}</TiketDatum>
                    <TiketDoktor>{tiket?.doctorName}</TiketDoktor>
                    <TiketStatus>{tiket?.isAnswered ? "Odgovoren" : "Otvoren"}</TiketStatus>
                </TiketInfo>

                {tiket?.isAnswered ? (
                    <React.Fragment>
                        <hr />

                        <TiketRelativeContainer>

                            {isEditing ? (<React.Fragment>
                                <TiketTitle>Odgovori pacijentu</TiketTitle>
                                <TiketDescriptionEdit placeholder="Tekst..." onChange={handleChangeDescription} value={description} />
                                <SubmitButton onClick={handleAnswer}>Odgovori</SubmitButton>
                            </React.Fragment>) : (
                                <React.Fragment>
                                    {isPacijent ? (
                                        <IconEdit onClick={() => handleMessage(tiket?.doktorPublicId)}>
                                            <AiOutlineMail fontSize={"20px"} />
                                        </IconEdit>) :
                                        (
                                            <IconEdit onClick={handleEdit}>
                                                <AiFillEdit color="blue" fontSize={"20px"} />
                                            </IconEdit>
                                        )}
                                    <TiketContent>
                                        <TiketDoktorOdgovor>{doktorIme}</TiketDoktorOdgovor>
                                        {/* <TiketTitle>{tiket?.answer.title}</TiketTitle> */}
                                        <TiketDescription>{tiket?.odgovorLekara}</TiketDescription>
                                    </TiketContent>
                                    <TiketPoslednjiOdgovor>{tiket?.datumOdgovoraLekara}</TiketPoslednjiOdgovor>
                                    {isPacijent && (
                                        <Rate>
                                        <Star onMouseEnter={() => setMouseHover(1)} onMouseLeave={() => setMouseHover(0)} onClick={() => rateDoktor(1)}>
                                            {mouseHover >= 1 ? (
                                                <AiFillStar />
                                            ) : (
                                                <AiOutlineStar />
                                            )}
                                        </Star>
                                        <Star onMouseEnter={() => setMouseHover(2)} onMouseLeave={() => setMouseHover(0)} onClick={() => rateDoktor(2)}>
                                            {mouseHover >= 2 ? (
                                                <AiFillStar />
                                            ) : (
                                                <AiOutlineStar />
                                            )}
                                        </Star>
                                        <Star onMouseEnter={() => setMouseHover(3)} onMouseLeave={() => setMouseHover(0)} onClick={() => rateDoktor(3)}>
                                            {mouseHover >= 3 ? (
                                                <AiFillStar />
                                            ) : (
                                                <AiOutlineStar />
                                            )}
                                        </Star>
                                        <Star onMouseEnter={() => setMouseHover(4)} onMouseLeave={() => setMouseHover(0)} onClick={() => rateDoktor(4)}>
                                            {mouseHover >= 4 ? (
                                                <AiFillStar />
                                            ) : (
                                                <AiOutlineStar />
                                            )}
                                        </Star>
                                        <Star onMouseEnter={() => setMouseHover(5)} onMouseLeave={() => setMouseHover(0)} onClick={() => rateDoktor(5)}>
                                            {mouseHover >= 5 ? (
                                                <AiFillStar />
                                            ) : (
                                                <AiOutlineStar />
                                            )}
                                        </Star>
                                    </Rate>
                                    )}
                                </React.Fragment>
                            )}
                        </TiketRelativeContainer>
                    </React.Fragment>
                ) : (!isPacijent ? (
                    <TiketEditContent>
                        <hr />
                        <TiketTitle>Odgovori pacijentu</TiketTitle>
                        <TiketDescriptionEdit placeholder="Tekst..." onChange={handleChangeDescription} />
                        <SubmitButton onClick={handleAnswer}>Odgovori</SubmitButton>
                        <hr />
                        <TiketTitle>Prosledi doktoru</TiketTitle>
                        <TiketSelect onChange={handleChangeSelect}>
                            {kolege.map(item => {
                                if (item.id.toString() !== userId.toString()) {
                                    return (
                                        <option value={item.id} key={item.id}>{item.naziv}</option>
                                    )
                                } else {
                                    return <></>
                                }
                            })}
                        </TiketSelect>
                        <SubmitButton onClick={handleForward}>Prosledi doktoru</SubmitButton>
                    </TiketEditContent>
                ) : (<></>))
                }
            </TiketContainer >
        </Container >
    )
}

export default Tiket