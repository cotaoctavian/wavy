import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    body {
        margin: 0;
        background-image: linear-gradient(90deg, #a8edea 0%, #fed6e3 100%);
        font-family: 'Poppins', FontAwesome, sans-serif;
    }
`;

export const ResetContainer = styled.div`
    display: grid;
    background-color: white;
    border-radius: 15px;
    width: 40%;
    height: 100%;
    margin: 12.5% 0 0 25%;
    text-align: center;
    padding: 0 4% 4% 4%;
    -webkit-box-shadow: -1px 0px 16px 0px rgba(0,0,0,0.30);
    -moz-box-shadow: -1px 0px 16px 0px rgba(0,0,0,0.30);
    box-shadow: -1px 0px 16px 0px rgba(0,0,0,0.30);

    & span {
        font-size: 12px;
    }

    & h1 {
        font-size: 30px;
        font-weight: 500;
    }
`;

export const ResetForm = styled.form`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 2fr 2fr;
    justify-items: center;
    grid-row-gap: 45%;
`;

export const ResetCell1 = styled.input`
    width: 50%;
    height: 155%;
    padding-left: 2%;
    border: 1px solid white;
    background-color: #f2f2f2;
    grid-column: 1;
    grid-row: 1;
    border-radius: 20px;
    font-family: 'Poppins', FontAwesome, sans-serif;
    font-weight: 500;

    &:focus{
        outline: none;
    }

    &:focus::placeholder{
        color: #48c78b;
        transition-duration: 1s;
    }

    &:not(:focus)::placeholder{
        transition-duration: 1s;
    }
`;

export const ResetCell2 = styled.button`
    width: 25%;
    height: 175%;
    grid-column: 1;
    grid-row: 2;
    border: 1px solid white;
    border-radius: 20px;
    background-color: #48c78b;
    font-family: 'Poppins', FontAwesome, sans-serif;
    color: white;

    &:focus{
        outline: none;
    }

    &:hover{
        background-color: black;
        transition-duration: 1s;
        transform: scale(1.1);
    }

    &:not(:hover){
        transition-duration: 1s;
    }
`;

export const ResetCell3 = styled.span`
    grid-column: 1;
    grid-row: 3;
    width: 25%;
    height: 175%;
    text-align: center;
    align-items: center;
    font-family: 'Poppins', FontAwesome, sans-serif;
    color: #ed958e;
    font-size: 12px;
`;