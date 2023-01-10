import styled from "styled-components";

export const Container = styled.div`
    text-align: center;
`
export const ProfilContainer = styled.div`
    width: 600px;
    border: 1px dotted gray;
    box-shadow: 0 0 5px 1px gray;
    margin: 50px auto;
    padding: 50px;
    padding-top: 10px;
    position: relative;
    @media (max-width: 768px) {
        width: 540px;
    }
    @media (max-width: 540px) {
        width: 340px;
    }
`
export const Field = styled.div`
    border-bottom: 1px dotted gray;
    margin-top: 40px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    @media (max-width: 768px) {
        text-align: center;
        flex-direction: column;
        border: 0;
    }
`
export const Label = styled.span`
    font-weight: bold;
    @media (max-width: 768px) {
        border-bottom: 1px dotted gray;
    }
`
export const Value = styled.span`
color: #3d8bfd;`
export const EditButton = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    border: 2px solid #3d8bfd;
    color: #3d8bfd;
    border-radius: 20px;
    padding: 2px 10px;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: #3d8bfd;
    }

`
export const Title = styled.h2`
    text-align: center;
`