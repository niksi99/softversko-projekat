import styled from "styled-components";



export const Container = styled.div`
    height: 45px;
    background-color: #3d8bfd;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 70px;
`
export const List = styled.ul`
    list-style-type: none;
    margin: 0;
    
    ${props => props.isLoggedIn && `
        & > li:last-of-type {
            width: 40px;
        }
    `}
`
export const ListItem = styled.li`
    display: inline-block;
    height: 105%;
    text-align: center;
    

    & a {
        text-decoration: none;
        color: black;
        display: inline-block;
        padding: 0 15px;
        height: 105%;
        padding-top: 9px;
        font-size: 18px;
        color: white;
        font-weight: bold;
    }
    & span {
        text-decoration: none;
        color: black;
        display: inline-block;
        padding: 0 15px;
        height: 105%;
        padding-top: 9px;
        font-size: 18px;
        color: white;
        cursor: pointer;
    }
    &:hover {
        background-color: #6ea8fe;
    }
    &:hover a:hover {
        background-color: #6ea8fe;
        font-weight: bold;
    }
`
export const LogoText = styled.div`
    color: white;
    padding-top: 5px;
    font-size: 22px;
    font-weight: bold;
    padding-left: 40px;
    white-space: nowrap;
    cursor: pointer;
    & a {
        text-decoration: none;
        color: white;
        font-size: 22px;
    }
`
export const SlideDown = styled.div`
    position: absolute;
    right: 5px;
    background-color: black;
    z-index: 20;
`
export const SlideDownItem = styled.li`
`
export const MobileIconUser = styled.div`
    position: absolute;
    top: 5px;
    right: 12px;
`
export const MobileIconTools = styled.div`
    position: absolute;
    top: 5px;
    right: 12px;
`