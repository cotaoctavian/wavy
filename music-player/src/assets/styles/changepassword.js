import styled from 'styled-components';

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
    
    & span:nth-child(2) {
        width: 98%;
        background-color: white;
        border-left: 5px solid #ff887a;
    }
`;

export const Ftdiv = styled.div`
    border-left: 1px solid black;

    & div {
        width: 80%;     
    }

    & div form {
        display: grid;
        grid-gap: 10px;
        padding-bottom: 40px;
        padding-top: 30px;
        width: 80%;
        margin-left: 3%;
    }

    & div form input {
        padding: 8px;
        border: 1px solid gray;
    }

    & div form input:focus{
        outline: none !important;
        border:1px solid #ff887a;
    }

    & div form hr {
        width: 100%;    
    }

    & div form div {
        display: flex;
    }

    & div form button {
        width: 30%;
        margin-right: 40px;
        padding: 10px 10px 10px 10px;
        background-color: #e3e5e8;
        border: 2px solid gray;
        border-radius: 25px;
        cursor: pointer;
        font-family: 'Poppins';
    }

    & div form button:hover{
        transition: 1s;
        border: 2px solid #ff887a;
        background-color: white;
    }

    & div form button:not(:hover){
        transition: 1s;
    }

`;

