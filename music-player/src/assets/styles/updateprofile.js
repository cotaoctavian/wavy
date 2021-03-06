import styled from 'styled-components';

export const Sdiv = styled.div`
    background:#ebeef2;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: repeat(5, 40px);
    grid-gap: 20px;

    & span {
        border-bottom: 0.5px solid black;
        width: 100%;
        height: 100%;
        text-align: center;
        padding-top: 20px;
    }

    & span:hover {
        width: 100%;
        box-shadow: 5px 0px 0px #ff887a inset;
    }
    
    & span:nth-child(3) {
        width: 100%;
        background-color: white;
        box-shadow: 5px 0px 0px #ff887a inset;
        border-top: 0.5px solid black;
    }
`;

export const Ftdiv = styled.div`
    border-left: 1px solid black;

    & div {
        padding-left:1.5%;
        display: flex;
        width: 80%;
    }

    & div div {
        display: grid;
        height: 300px;
        padding-right: 5%;
    }

    & div div img {
        margin-bottom: 28px;
        width: 175px;
        height: 175px;
        border: 3px solid #ced4de;
        padding: 10px;
    }

    & div div form {
        display: grid;
        grid-gap: 10px;
    }

    & div div:nth-child(2){
        margin-left: 10%;
    }

    & div div:nth-child(1) form input[type='file'] {
        border: 1px solid gray;
        width: 80%;
        padding: 2px;
        font-family: 'Poppins', sans-serif;
    }

    & div div:nth-child(2) form input{
        padding: 5px 5px 5px 5px;
        border: 1px solid gray;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
    }

    & div div form input:focus{
        outline: none;
        border:1px solid #ff887a;
        font-family: 'Poppins', sans-serif;
    }

    & div div form button {
        width: 50%;
        padding: 8px;
        background-color: #ebeef2;
        border: 2px solid gray;
        border-radius: 25px;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
    }

    & div div form button:focus {
        outline: none;
    }

    & div div form span {
        font-size: 12px;
    }

    & div div form button:hover{
        transition: 1s;
        border: 2px solid #ff887a;
        background-color: white;
    }

    & div div form button:not(:hover){
        transition: 1s;
    }
`;