import React, { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom'
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';
import { getMessages } from '../../store/thunks/chat';
import { convertDateToString } from '../../utils/dateHelper';
import { LastMessage, LastMessageSent, MessageContainer, MessagesContainer, MessageUser } from './Messages.styled'

export const Messages = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat.lastMessages);
    const personsPossibleToChat = useSelector(state => state.chat.personsPossibleToChat);
    const userId = useSelector(state => state.user.userId);
    const {isPacijent, loaded} = useIsLoggedIn();
    useEffect(() => {
        if (userId && loaded) {
            dispatch(getMessages(userId, !isPacijent))
        }
    }, [userId, loaded])
    const handleClickMessage = (userID) => {
        history.push(`/Messages/${userID}`)
    }
    return (
        <MessagesContainer>
            {messages.map(item => {
                // const person = personsPossibleToChat.find(p => p?.publicId?.toString() === item.osoba.publicID.toString());
                // console.log(person);
                return (
                <MessageContainer onClick={() => handleClickMessage(item.osoba.publicID)}>
                    <MessageUser>
                        {`${item.osoba.ime} ${item.osoba.prezime}`}
                    </MessageUser>
                    <LastMessage>
                        {item.poruka.tekstPoruke}
                    </LastMessage>
                    <LastMessageSent>
                        {convertDateToString(new Date(item.poruka.datumPoruke))}
                    </LastMessageSent>
                </MessageContainer>
            )})}
            {messages.length === 0 && <div style={{textAlign: "center", fontWeight: "bold", fontSize: "20px"}}>Trenutno nemate nijednu poruku.</div>}
        </MessagesContainer>
    )
}
