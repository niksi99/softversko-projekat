import styled from "styled-components";

export const Container = styled.div`
    padding: 20px 100px;
    @media (max-width: 768px) {
        padding: 20px 20px;
    }
`
export const TiketiList = styled.div`
display: flex;
flex-direction: column-reverse;
`
export const TiketContainer = styled.div`
    width: 100%;
    height: 280px;
    box-shadow: 0 0 5px 1px gray;
    border-radius: 5px;
    padding: 20px;
    position: relative;
    margin-bottom: 40px;
    cursor: pointer;
`
export const TiketTitle = styled.div`
    font-weight: bold;
    padding-bottom: 5px;
    font-size: 20px;
`
export const TiketDescription = styled.div`
    overflow: hidden;
    display: -webkit-box;
   -webkit-line-clamp: 4;
   -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    width: 100%;
    height: 84px;
`
export const TiketPoslednjiOdgovor = styled.span`
    position: absolute;
    top: 140px;
    right: 10px;

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
    position: absolute;
    bottom: 30px;
    left: 10px;
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
        flex-direction: column;
        & span {
            text-align: left;
        }
    }
`
export const EmptyPage = styled.div`
    text-align: center;
    font-weight: 700;
    font-size: 22px;
`
