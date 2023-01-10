import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 100%;
    min-height: 100%;
    padding-bottom: 280px;
    @media (max-width: 768px) {
        padding-bottom: ${props => props.isLoggedIn ? "390px" : "440px"};
    }
`