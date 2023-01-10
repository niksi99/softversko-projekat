import styled from "styled-components";

export const MessagesContainer = styled.div`
    padding-top: 50px;
    display: flex;
    flex-direction: column-reverse;
`
export const MessageContainer = styled.div`
    width: 70%;
    margin: 5px auto;
    position: relative;
    border: 1px solid black;
    height: 60px;
    cursor: pointer;
    border-radius: 8px;
`
export const MessageUser = styled.div`
    font-weight: bold;
    font-size: 18px;
    position: absolute;
    top: 0px;
    left: 5px;
    color: #3d8bfd;
`
export const LastMessage = styled.div`
    position: absolute;
    bottom: 5px;
    left: 5px;
    white-space: nowrap;
    overflow: hidden;
    width: 95%;
    text-overflow: ellipsis;
`
export const LastMessageSent = styled.div`
    position: absolute;
    top: 0;
    right: 5px;
    font-style: italic;

`