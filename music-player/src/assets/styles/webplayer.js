import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    body {
        margin: 0;
    }
`;

export const Header = styled.nav`
    overflow:hidden;
    background-color: black;
    position: absolute;
    width: 100%;
    height: 7%;
    display: grid;
    grid-template-columns: 0.1fr 0.9fr 0.1fr;
    align-items: center;
    justify-content: center;
    align-content: center;
    

    & div:nth-child(1) {
        padding-left: 50px;
        display: grid;
        grid-column: 1;
        grid-template-columns: 0.1fr 0.2fr;
        grid-template-rows: 0.7fr;
        justify-content: center;
        align-items: center;
    }

    & div:nth-child(1) img {
        width: 55px;
    }

    & div:nth-child(1) span {
        color: white;
        font-family: 'Poppins', FontAwesome, sans-serif;
        font-weight: 500;
        font-size: 18px;
    }

    & img {
        width: 45px;
    }
`;

export const Links = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & span {
        padding: 20px;
        font-family: 'Poppins', sans-serif;
    }
`;

export const Main = styled.div`
    background-color: #1a1a1a;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 7%;
`;


export const Menu = styled.div`
    display: flex;
    margin-left: 45px;
    & span {
        padding: 20px;
        font-family: 'Poppins', sans-serif;
    }
`;

export const SongsList = styled.div`
    display: grid;
    margin-top: 25px;
    width: 80%;
    margin-left: 65px;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    max-height: 600px;
    font-size: 15px;
`;
