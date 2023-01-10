import styled from "styled-components";

export const MessageUserContainer = styled.div`
    margin: 20px 100px;
    position: relative;
    @media (max-width: 768px) {
        margin: 20px 10px;
    }
`
export const MessageHeader = styled.div`
    position: sticky;
    background-color: #f0f0f0;
    top: 0;
    left: 0;
    padding-top: 20px;
    padding-left: 30px;
    font-weight: bold;
    font-size: 20px;
    height: 70px;
    width: 100%;
`
export const MessageList = styled.div`
    width: 100%;
    flex-direction: column-reverse;
    justify-content: right;
    border: 1px solid black;
    overflow: auto;
    height: 600px;
    @media (max-width: 768px) {
        height: 70vh
    }
`
export const Message = styled.div`
    
   
   
    flex: 1 0 auto;
    margin: 10px;
    padding: 10px;
    padding-top: 0;
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;

    & div {
        /* flex: 1;
        background-color: #f7f7f7;
        border-radius: 10px;
        box-shadow: 0 0 2px 1px gray;
        min-height: 40px;
        padding: 6px; */
    }
`
export const EmptySpace = styled.div`
    flex: 1;
`
export const MessageContent = styled.div`
    flex: 1;
        background-color: #f7f7f7;
        border-radius: 10px;
        box-shadow: 0 0 2px 1px gray;
        min-height: 40px;
        padding: 6px;
        & img {
            height: 150px;
            width: 150px;
            cursor: pointer;
        }
`
export const Indicator = styled.div`
`
export const MessageTools = styled.div`
    border: 1px solid black;

`
export const SendImage = styled.div`
    border-bottom: 1px solid black;
`
export const MessageInputBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex: 1;
`
export const Input = styled.textarea`
    height: 80px;
    flex: 1;
    border: 0;
    font-size: 16px;
`
export const SendButton = styled.div`
    box-shadow: 0 0 5px 1px gray;
    width: 80px;
    text-align: center;
    padding-top: 27px;
    cursor: pointer;
`
export const Backdrop = styled.div`
    background-color: rgb(0, 0, 0, 0.75);
    z-index: 51;
    position: absolute;
    left: 0;
    top: 0;
    width: 120vw;
    height: 120vh;
    text-align: center;
    padding-top: 35vh;
    overflow: hidden;
    top: -20%;
    left: -20%;
    & img {
        @media (max-width: 548px) {
            max-width: 360px;
        }
    }
`
