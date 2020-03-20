import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    body {
        margin: 0;
        overflow: hidden;
    }
`;

export const ContainerPlayer=styled.div`
    display: grid;
    grid-template-columns: 0.07fr 0.075fr 0.07fr 0.2fr 0.8fr 1.2fr 0.3fr;
    align-items: center;
    position: absolute;
    bottom: 0;
    border: 2px solid black;
    width: 100%;
    height: 6%;
    background-color: black;

    & button {
        padding-top: 2px;
        border: 0;
        outline: none;
        color: white;
        width: 40px;
        background-color: black;
        font-size: 30px;
    }
`;

export const TimerDiv = styled.div`
    & span {
        display: inline-block;
        font-family: "Poppins";
        color: white;
    }
    
    & span:nth-child(1) {
        width: 50px;
        padding-right: 5px;
    }

    & span:nth-child(3) {
        padding-left: 5px;
    }
`;

export const OptionsDiv = styled.div`
    display: flex;
`;

export const SongInformation = styled.div` 
    color: white;
    font-family: 'Poppins', sans-serif;     
    display: grid;
    grid-template-columns: 0.07fr 0.3fr 0.1fr;

    & img {
        width: 45px;
        height: 45px;
        border-radius: 5%;
        margin-top: 2px;
    }

    & div {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`;