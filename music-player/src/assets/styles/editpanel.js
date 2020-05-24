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
    
    & span:nth-child(5) {
        width: 100%;
        background-color: white;
        box-shadow: 5px 0px 0px #ff887a inset;
        border-top: 0.5px solid black;
    }
`;

export const Ftdiv = styled.div`
    border-left: 1px solid black;
    width: 100%;

    & span {
        font-size: 12px;
    }

    & > div {
        display: flex;
        width: 100%;

        & > div:first-child {
            padding-left: 3%;
            width: 40%;
            flex: 1;

            & > form {
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 0.05fr 0.1fr 0.2fr 0.1fr 0.2fr 0.1fr 0.2fr 0.2fr;
                grid-gap: 10px;
                height: 300px;
                padding-right: 5%;
                width: 100%;

                & label {
                    font-weight: 500;
                }

                & input {
                    width: 70%;
                    font-family: 'Poppins', sans-serif;
                    padding: 5px 5px 5px 5px;
                    border: 1px solid gray;
                }

                & input:focus {
                    outline: none;
                    border:1px solid #ff887a;
                    font-family: 'Poppins', sans-serif;
                }

                & button {
                    width: 45%;
                    background-color: #ebeef2;
                    padding: 8px;
                    border: 2px solid gray;
                    border-radius: 25px;
                    font-family: 'Poppins', sans-serif;
                }

                & button:hover{
                    transition: 1s;
                    border: 2px solid #ff887a;
                    background-color: white;
                }

                & button:not(:hover){
                    transition: 1s;
                }

                & button:focus {
                    outline: none;
                }
            }
        }

        & > div:nth-child(2) {
            flex: 1;
            & > form {
                display: grid;
                grid-template-columns: 1fr;
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 0.05fr 0.1fr 0.2fr 0.1fr 0.2fr 0.1fr 0.2fr 0.2fr;
                grid-gap: 10px;
                padding-right: 5%;
                width: 100%;

                & label {
                    font-weight: 500;
                }

                & input {
                    width: 70%;
                    font-family: 'Poppins', sans-serif;
                    padding: 5px 5px 5px 5px;
                    border: 1px solid gray;
                }

                & input:focus {
                    outline: none;
                    border:1px solid #ff887a;
                    font-family: 'Poppins', sans-serif;
                }

                & button {
                    width: 45%;
                    background-color: #ebeef2;
                    padding: 8px;
                    border: 2px solid gray;
                    border-radius: 25px;
                    font-family: 'Poppins', sans-serif;
                }

                & button:hover{
                    transition: 1s;
                    border: 2px solid #ff887a;
                    background-color: white;
                }

                & button:not(:hover){
                    transition: 1s;
                }

                & button:focus {
                    outline: none;
                }
            }
            
        } 
    }
   

`;