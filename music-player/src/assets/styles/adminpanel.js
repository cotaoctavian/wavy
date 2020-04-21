import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    body {
        margin: 0;
        background-color: #68AEFF;
    }
`;

export const Global2 = createGlobalStyle`
    body {
        margin: 0;
        background-color: white;
    }

`;


export const AdminContainer = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: 1fr;
    max-width: 400px;
    height: 360px;
    width: 100%;
    padding: 1.5em 0;
    top: 45%; left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 10px;
    background-color: white;
    -webkit-box-shadow: 0px 0px 16px -2px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 16px -2px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 16px -2px rgba(0, 0, 0, 0.75);

    & h2 {
        font-family: 'Poppins', sans-serif;
        margin-bottom: 30px;
        font-size: 28px;
    }

    & form {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(5, auto);
        grid-gap: 1.5em;
        justify-items: center;
    }

    & input {
        width: 60%;
        padding: 10px;
        font-family: 'Poppins', sans-serif;
        border-radius: 5px;
        background-color: #F6F6F6;
        border: 2px solid #F6F6F6;
        outline: none;
    }

    & input:focus{
        border: 2px solid #6AA9FF;
    }

    & button {
        width: 40%;
        background-color: #6AA9FF;
        color: white;
        padding: 10px;
        font-family: 'Poppins', sans-serif;
        border-radius: 5px;
        border: 1px solid #F6F6F6;
        outline: none;
        cursor: pointer;
        font-weight: 500;
    }


    & p {
        position: absolute;
        color: black;
        font-size: 12px;
        font-family: 'Poppins', sans-serif;
        margin-left: 0.8em;
        margin-top: 1em;
        top: 88%;
        left: 15%;
    }
`;

export const HeaderAdmin = styled.header`
    width: 100%;
    background-color: #68AEFF;
    color: white;
    -webkit-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .75);
    -moz-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .75);
    box-shadow: 0 0 16px -2px rgba(0, 0, 0, .75);


    & > div {
        display: grid;
        grid-template-columns: 0.5fr 0.2fr;
        width: 100%;
        margin: 0 auto;
        align-items: center;
        padding: 0 1em;
        grid-template-rows: 1fr;
    }

    & div > div {
        display: inline-block;

        & img {
            vertical-align:middle;
        }

        & span {
            font-family: 'Poppins', sans-serif;
            font-size: 18px;
        }
    }

    & div > nav {
        height: 100%;
        display: flex;
        justify-self: end;
        position: relative;
        left: 200%;
        align-items: center;

        & a {
            flex: 1;
        }

        & button {
            flex: 1;
            background: #ff4242;
            border: 1px solid #ff4242;
            border-radius: 5px;
            height: 50%;
            width: 120px;
            color: white;
            font-weight: 400;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
        }

        & button:hover{
            transform: scale(1.05);
            transition: transform .1s linear;
        }

        & button:not(:hover){
            transform: scale(1);
            transition: transform .1s linear;
        }
    }
`;


export const ArtistsContainer = styled.div`
    position: absolute;
    left: 32%;
    top: 20%;
    width: 25%;
    height: 49%;
    font-family: 'Poppins', sans-serif;

    background-color: #87bdff;
    border-radius: 5px;
    color: white;
    text-align: center;

    -webkit-box-shadow: 2px 6px 18px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 2px 6px 18px -2px rgba(0,0,0,0.75);
    box-shadow: 2px 6px 18px -2px rgba(0,0,0,0.75);

    & form {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 1fr;
        grid-gap: 1em;
        width: 100%;
        justify-content: center;
        margin-bottom: 4em;
        text-align: left;

        & input[type="text"] {
            padding: 10px 20px;
            border-radius: 5px;
            border: 2px solid #68AEFF;
            outline: none;
            font-family: 'Poppins', sans-serif;
        }

        & input[type="text"]:focus {
            border: 2px solid #ff6b6b;
        }

        & input[type="file"] {
            font-family: 'Poppins', sans-serif;
        }

        & button {
            padding: 10px 0px;
            border-radius: 5px;
            border: 1px solid #68AEFF;
            font-family: 'Poppins', sans-serif;
            background-color: #ff6b6b;
            font-weight: 400;
            color: white;
        }

        & button:hover{
            transform: scale(1.05);
            transition: transform .1s linear;
        }

        & button:not(:hover){
            transform: scale(1);
            transition: transform .1s linear;
        }
    }
`;


export const AlbumsContainer = styled.div`
    position: absolute;
    left: 32%;
    top: 20%;
    width: 25%;
    height: 49%;
    font-family: 'Poppins', sans-serif;

    background-color: #87bdff;
    border-radius: 5px;
    color: white;
    text-align: center;

    -webkit-box-shadow: 2px 6px 18px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 2px 6px 18px -2px rgba(0,0,0,0.75);
    box-shadow: 2px 6px 18px -2px rgba(0,0,0,0.75);

    & form {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 1fr;
        grid-gap: 1em;
        width: 100%;
        justify-content: center;
        align-items: center;
        justify-items: center;
        margin-bottom: 4em;

        & input[type="text"] {
            padding: 10px 20px;
            width: 84%;
            border-radius: 5px;
            border: 2px solid #68AEFF;
            outline: none;
            font-family: 'Poppins', sans-serif;
        }

        & input[type="text"]:focus {
            border: 2px solid #ff6b6b;
        }

        & input[type="file"] {
            font-family: 'Poppins', sans-serif;
        }

        & button {
            padding: 10px 20px;
            width: 100%;
            border-radius: 5px;
            border: 1px solid #68AEFF;
            font-family: 'Poppins', sans-serif;
            background-color: #ff6b6b;
            font-weight: 400;
            color: white;
        }

        & button:hover{
            transform: scale(1.05);
            transition: transform .1s linear;
        }

        & button:not(:hover){
            transform: scale(1);
            transition: transform .1s linear;
        }
    }
`;


export const SongsContainer = styled.div`
    position: absolute;
    left: 32%;
    top: 20%;
    width: 25%;
    height: 70%;
    font-family: 'Poppins', sans-serif;

    background-color: #87bdff;
    border-radius: 5px;
    color: white;
    text-align: center;

    -webkit-box-shadow: 2px 6px 18px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 2px 6px 18px -2px rgba(0,0,0,0.75);
    box-shadow: 2px 6px 18px -2px rgba(0,0,0,0.75);

    & form {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 1fr;
        grid-gap: 1em;
        width: 100%;
        justify-content: center;
        margin-bottom: 4em;
        text-align: left;

        & input[type="text"] {
            padding: 10px 20px;
            border-radius: 5px;
            border: 2px solid #68AEFF;
            outline: none;
            font-family: 'Poppins', sans-serif;
        }

        & input[type="text"]:focus {
            border: 2px solid #ff6b6b;
        }

        & input[type="file"] {
            font-family: 'Poppins', sans-serif;
        }

        & button {
            padding: 10px 0px;
            border-radius: 5px;
            border: 1px solid #68AEFF;
            font-family: 'Poppins', sans-serif;
            background-color: #ff6b6b;
            font-weight: 400;
            color: white;
        }

        & button:hover{
            transform: scale(1.05);
            transition: transform .1s linear;
        }

        & button:not(:hover){
            transform: scale(1);
            transition: transform .1s linear;
        }

    }
`;