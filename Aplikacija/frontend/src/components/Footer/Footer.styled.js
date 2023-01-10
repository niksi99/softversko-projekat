import styled from "styled-components";

export const Container = styled.div`
    height: 240px;
    background-color: #3d8bfd;
    width: 100%;
    text-align: center;
    overflow: hidden;
    padding: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    flex-direction: column;
    @media (max-width: 768px) {
        height: ${props => props.isLoggedIn ? "340px" : "400px"}
    }
`

export const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const List = styled.ul`
    list-style-type: none;
    margin: 0;
    text-align: center;
    padding-inline-start: 0px;
    @media (max-width: 768px) {
        padding-bottom: 20px;
    }
`
export const ListTitle = styled.li`
    padding-bottom: 10px;
    font-weight: bold;
    text-align: center;
    color: white;
`
export const ListItem = styled.li`
    cursor: pointer;
    text-align: center;
    text-decoration: none;
        padding-top: 6px;
        font-size: 14px;
        color: white;

    & a {
        text-decoration: none;
        padding-top: 6px;
        font-size: 14px;
        color: white;
    }
`
export const Bottom = styled.div`
    width: 100%;
    background-color: #2078f7;
    text-align: center;
    height: 45px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding-top: 10px;
    color: white;

`