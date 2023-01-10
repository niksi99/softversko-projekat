import styled from "styled-components";

export const Container = styled.div`
    padding: 20px 100px;
    @media (max-width: 768px) {
        padding: 20px 20px;
    }
`
export const TiketiList = styled.div`
`
export const TiketContainer = styled.div`
    width: 100%;
    border-radius: 5px;
    padding: 20px;
    position: relative;
    border-radius: 0;
    z-index: 0;
    box-shadow: 0 0 5px 1px gray;
`
export const TiketTitle = styled.div`
    font-weight: bold;
    padding-bottom: 5px;
    font-size: 20px;
`
export const TiketTitleEdit = styled.input`
    font-weight: bold;
    padding-bottom: 5px;
    font-size: 20px;
    width: 100%;
    margin-bottom: 5px;
    margin-top: 15px;
`
export const TiketDescription = styled.div`
    width: 100%;
`
export const TiketDescriptionEdit = styled.textarea`
    width: 100%;
    min-height: 100px;
    border: 1px solid black;
`
export const TiketPoslednjiOdgovor = styled.span`
    position: absolute;
    bottom: 0;
`


export const TiketDatum = styled.span`
    flex: 1;
    text-align: center;
    font-style: italic;
`
export const TiketDoktor = styled.span`
    flex: 1;
    text-align: center;
    
`
export const TiketStatus = styled.span`
    flex: 1;
    text-align: center;

`
export const TiketInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
        flex-direction: column;
        & span {
            text-align: left;
        }
    }
`
export const TiketDoktorOdgovor = styled.div`
    font-style: italic;
`
export const TiketContent = styled.div`
    flex: 1;
    padding-bottom: 40px;
    padding-right: 40px;
`
export const SubmitButton = styled.button`
    background-color: #3d8bfd;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    border: 0;
    color: white;
    cursor: pointer;
`
export const TiketRelativeContainer = styled.div`
    position: relative;
    margin-bottom: 20px;
`
export const TiketEditContent = styled.div`
    flex: 1;
`
export const TiketSelect = styled.select`
    width: 200px;
    height: 40px;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 10px;
    @media (max-width: 768px) {
        width: 100%;
    }
`
export const IconEdit = styled.div`
    border-radius: 100%;
    border: 1px solid #3d8bfd;
    width: 33px;
    height: 33px;
    padding-left: 5px;
    padding-top: 5px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    & svg {
        color: #3d8bfd !important;
    }
    &:hover {
        background-color: #3d8bfd;
    }
    &:hover svg {
        color: white !important;
    }

`
export const MessageIcon = styled.div`
 border-radius: 100%;
    border: 1px solid #3d8bfd;
    width: 32px;
    height: 32px;
    padding-left: 5px;
    padding-top: 5px;
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
    & svg {
        color: #3d8bfd !important;
    }
    &:hover {
        background-color: #3d8bfd;
    }
    &:hover svg {
        color: white !important;
    }
`
export const Rate = styled.div`
    display: flex;
    flex-direction: row;
    width: 120px;
    position: absolute;
    bottom: -30px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
`
export const Star = styled.div`
    width: 20px;
    height: 20px;
    margin: 2px;
    cursor: pointer;
    color: #3d8bfd;
    & svg {
        height: 19px;
        width: 19px;
    }
`
