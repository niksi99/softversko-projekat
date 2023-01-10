import React, { useEffect, useState, useRef } from 'react'
import { ref, onValue, set } from "firebase/database";
import database from '../../../utils/firebaseDb';
import { Message, MessageList, MessageHeader, MessageUserContainer, EmptySpace, MessageContent, Indicator, MessageInputBox, Input, SendButton, MessageTools, SendImage, Backdrop } from './MessageUser.styled'
import { Redirect, useLocation, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPossiblePersonsToChatWith } from '../../../store/thunks/chat';
import { useIsLoggedIn } from '../../../hooks/useIsLoggedIn';
import { getTiketiDoktorThunk, getTiketiPacijentThunk } from '../../../store/thunks/tiket';

export const MessageUser = () => {

    const [image, setImage] = useState("");
    const [succeed, setSucceed] = useState(false);
    const [messageTyped, setMessageTyped] = useState("");
    const location = useLocation();
    const userId = useSelector(state => state.user.userId);
    const routeMatch = useRouteMatch();
    const [messages, setMessages] = useState([]);
    const [messagesReciever, setMessageReciever] = useState([]);
    const [imgSrc, setImgSrc] = useState("");
    const listRef = useRef()
    const fileRef = useRef();
    const personsPossibleToChat = useSelector(state => state.chat.personsPossibleToChat)
    const dispatch = useDispatch();
    const { isPacijent, loaded, isSpecijalizant } = useIsLoggedIn();
    const [notFound, setNotFound] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [reciever, setReciever] = useState({});
    const loader = useSelector(state => state.loader.loader);

    useEffect(() => {
        console.log(messages);
    }, [messages])

    useEffect(() => {
        let listener = () => { };
        console.log("personsPossibleToChat: ", personsPossibleToChat);
        if (personsPossibleToChat) {
            const recieverTemp = personsPossibleToChat.find(item => item?.publicId?.toString() === routeMatch.params.recieverId.toString());
            console.log("recieverTemp: ", recieverTemp);
            setReciever(recieverTemp);
            if (recieverTemp) {
                const recieverId = recieverTemp.id;
                const senderId = userId;
                const senderRef = ref(database, `messages/${senderId}/${recieverId}`);
                const recieverRef = ref(database, `messages/${recieverId}/${senderId}`);
                console.log('recieverId: ', recieverId);
                console.log('senderId: ', senderId);

                listener = onValue(senderRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setMessages([...data]);
                        setMessageReciever(messagesToRecieverMessages([...data]))
                    }
                })
            }
        }
        return () => listener();
    }, [userId, personsPossibleToChat, loaded])

    useEffect(() => {
        if (loaded) {
            if (isPacijent) {
                dispatch(getTiketiPacijentThunk(userId))
            } else {
                dispatch(getTiketiDoktorThunk(userId, isSpecijalizant))
            }
        }
    }, [loaded, userId])

    useEffect(() => {
        listRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [listRef])

    useEffect(() => {
        console.log(image);
    }, [image])

    useEffect(() => {
        console.log("recieverBr:", reciever);
    }, [reciever])

    const handleMessageTyped = () => {
        const senderId = userId;
        const recieverId = reciever.id;
        if (image.toString() === "" && messageTyped.toString() === "") return;
        console.log('recieverId: ', recieverId);
        console.log('senderId: ', senderId);
        console.log("putanja: ", `messages/${senderId}/${recieverId}`)
        const senderRef = ref(database, `messages/${senderId}/${recieverId}`);
        const recieverRef = ref(database, `messages/${recieverId}/${senderId}`);
        set(senderRef, [
            ...messages,
            {
                mine: true,
                text: fileRef.current.value ? image : messageTyped,
                date: (new Date()).toISOString(),
                type: fileRef.current.value ? "image" : "text"
            }
        ])
        set(recieverRef, [
            ...messagesReciever,
            {
                mine: false,
                text: fileRef.current.value ? image : messageTyped,
                date: (new Date()).toISOString(),
                type: fileRef.current.value ? "image" : "text"
            }
        ]);
        setMessageTyped("")
        fileRef.current.value = null;
        setImgSrc("");
        setImage("");
    }
    const handleMessageChanged = (event) => {
        setMessageTyped(event.target.value);
    }

    const showImage = (base64Format) => {
        setImgSrc(base64Format);
    }

    const messagesToRecieverMessages = (messages) => {
        const newMessages = [];
        for (let i = 0; i < messages.length; i++) {
            let newMessage = { ...messages[i] };
            newMessage.mine = !messages[i].mine;
            newMessages.push(newMessage)
        }
        return newMessages;
    }



    const handleInput = (event) => {
        console.log(event.target.value);
        const loader = new FileReader();

        loader.addEventListener("load", () => {
            setImage(loader.result);
        })
        loader.readAsDataURL(event.target.files[0]);
        setSucceed(true);
    }
    if (notFound) {
        return <Redirect to="/" />
    }
    return (
        <MessageUserContainer>
            {imgSrc.length > 0 && <Backdrop onClick={() => setImgSrc("")}><img src={imgSrc} /></Backdrop>}
            <MessageList >
                <MessageHeader>
                    {`${reciever?.ime}`}
                </MessageHeader>
                {messages.map(item => (
                    <Message key={item.id}>

                        {item.mine ? (
                            <React.Fragment>
                                <EmptySpace />
                                <MessageContent>{item.type === "text" ? item.text : (<img src={item.text} onClick={() => showImage(item.text)} />)}</MessageContent>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <MessageContent>{item.type === "text" ? item.text : (<img src={item.text} onClick={() => showImage(item.text)} />)}</MessageContent>
                                <EmptySpace />
                            </React.Fragment>
                        )}
                    </Message>
                ))}
                <Indicator ref={listRef}></Indicator>
            </MessageList>
            <MessageTools>
                <SendImage><input type="file" onChange={handleInput} ref={fileRef} /></SendImage>
                <MessageInputBox>
                    <Input type="text" onChange={handleMessageChanged} value={messageTyped} />
                    <SendButton onClick={handleMessageTyped} >SEND</SendButton>
                </MessageInputBox></MessageTools>

        </MessageUserContainer>
    )
}
