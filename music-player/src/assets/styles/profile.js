import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    body {
        margin: 0;
        background: rgb(87,168,255);
        background: linear-gradient(90deg, rgba(87,168,255,1) 0%, rgba(255,136,125,1) 49%, rgba(108,172,249,1) 100%);
        font-family: 'Poppins', FontAwesome, sans-serif;
    }
`;

export const Header = styled.header`
    overflow: hidden;
    background-color: black;
    position:fixed;
    top: 0;
    width: 100%;
    opacity: 0.85;
    text-align: center;
    display: grid; 
    grid-template-columns: 0.8fr, 0.07fr, 0.40fr;
    align-items: center;
    justify-content: center;
    align-content: center;

    & span {
        color: white;
        font-size: 20px;
    }

    & p {
        color: white;
        font-size: 20px;
        font-family: 'Poppins'
    }

    & img {
        width: 55px;
        height: 55px;
    }
`;

export const LeftHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    padding-left: 25%;
`;

export const RightHeader = styled.div`
    padding-right: 50px;
    display: grid;
    grid-template-columns: 0.07fr 0.2fr 0.2fr;
    grid-template-rows: 1fr;

    & img {
        width: 55px;
        height: 50px;
        border-radius: 100%;
        border: 1px solid gray;
        margin-top: 7px;
    }
`;

export const Main = styled.div`
    width: 60%;
    background-color:white;
    height: 600px;
    margin: auto;
    margin-top: 9%;
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    grid-template-rows: 0.2fr 1fr;
    opacity: 0.85;
    -webkit-box-shadow: 1px 3px 10px 3px rgba(0,0,0,0.75);
    -moz-box-shadow: 1px 3px 10px 3px rgba(0,0,0,0.75);
    box-shadow: 1px 3px 10px 3px rgba(0,0,0,0.75);

`;

export const Fdiv = styled.div`
    grid-row: 1;
    height: 100px;
    border-bottom: 1px solid black;

    background: #ebeef2;
    & img {
        width: 70px;
        position: relative;
        top: 15%;
        left: 35%;
        border-radius: 100%;
        border: 1px solid gray;
    }  
`;

export const Sdiv = styled.div`
    background:#ebeef2;
    grid-column: 1;
    grid-row: 2;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: repeat(3, 40px);
    grid-gap: 20px;

    & span {
        border-bottom: 0.5px solid black;
        width: 98%;
        height: 100%;
        text-align: center;
        padding-top: 20px;
        margin-right: 4px;
        border-left: 5px solid #ebeef2;
    }

    & span:hover {
        width: 98%;
        border-left: 5px solid #ff887a;
    }
    
    & span:first-child {
        width: 98%;
        background-color: white;
        border-left: 5px solid #ff887a;
    }
`;

export const Tdiv = styled.div`
    border-bottom: 1px solid black;

    grid-column: 2;
    grid-row: 1;
    width: 100%;
    height: 100px;
    border-left: 1px solid black;

    & h1 {
        padding-left: 25px;
        padding-top: 5px;
    }
`;

export const Ftdiv = styled.div`
    grid-column: 2;
    grid-row: 2;
    border-left: 1px solid black;
    width: 100%;

    & div h2{
        font-size: 24px;
        padding-left: 3%;
    }

    & div div {
        display: grid;
        grid-template-columns: 0.4fr 0.4fr;
        border-bottom: 1px solid black;
        width: 80%;
        margin-left: 3%;
        margin-top: 4.2%;
    }

    & div div span {
        font-size: 16px;
    }

    & div div:nth-child(3){
        margin-bottom: 5%;
    }
`;

export const Footer = styled.div`
    bottom: 0;
    width: 100%;
    height: 5%;
    background-color: black;
    text-align: center;
    display: grid;
    grid-template-columns: 0.7fr 0.3fr;
    align-items: center;
    justify-content: center;
    align-content: center;
    padding-top: 25px;
    font-family: 'PT Sans';
    opacity: 0.85;
    position: fixed;
`;

export const FooterLeftSide = styled.div`
    padding-left: 50px;
    color: white;
    display: grid;
    grid-column: 1;
    grid-template-columns: 0.5fr 0.2fr;
    width: 10%;
    grid-template-rows: 0.7fr;
    justify-content: center;
    align-items: center;
    padding-left: 24%;

    & img {
        width: 55px;
        height: 55px;
    }

    & span {
        font-size: 18px;
        font-weight: 500;
    }
`;

export const FooterRightSide = styled.div`
    padding-right: 50px;
    color: white;
    display: grid;
    grid-template-columns: 0.15fr 0.05fr 0.25fr;
    grid-template-rows: 1fr;

    & span {
        font-size: 15px;
    }

    & span:hover {
        transition-duration: 1.5s;
        color: #57aae6;
    }

    & span:not(:hover) {
        transition-duration: 1.5s;
    }

    & img {
        width: 20px;
    }
`;
