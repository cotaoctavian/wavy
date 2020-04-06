import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    body {
        margin: 0;
        background-color:#1a1a1a;
    }
`;

export const ArtistContainer = styled.div`
    color: white;
    font-family: 'Poppins', sans-serif;
    width: 70%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-column-gap: 25px;
    grid-row-gap: 20px; 
    margin-left: 62px;
`;

export const ArtistCover = styled.div`
    background-color: #363636;
`;

export const ArtistHeader = styled.div`
    background-color: black;
    display: flex;
    flex-direction: row;
    font-family: 'Poppins', sans-serif;

    & img {
        flex: 0.15;
        width: 260px;
        height: 230px;
        border-radius: 100%;
        margin-top: 6em;
        margin-left: 10em;
        margin-bottom: 3em;
    }

    & div {
        flex: 1;
        background-color: black;
        margin-top: 6em;
        margin-left: 4em;
        margin-bottom: 5em;

        & h1 {
            color: white;
        }

        & span {
            color: #c9c9c9;
        } 

        & div {
            display: flex;
            margin: 20px 0px 0px 0px;

            & button:nth-child(1) {
                background-color:  #c9c9c9;
                color: black;
                border: 2px solid  #c9c9c9;
                border-radius: 5px;
                padding: 10px 30px 10px 30px;
                font-family: 'Rubik', sans-serif;
                outline: none;
                cursor: pointer;
                font-weight: 500;
                text-transform: uppercase;
                margin-right: 20px;
            }

            & button:nth-child(2) {
                background-color: black;
                color: white;
                border: 2px solid white;
                border-radius: 5px;
                padding: 10px 20px 10px 20px;
                font-family: 'Rubik', sans-serif;
                outline: none;
                cursor: pointer;
                font-weight: 500;
                text-transform: uppercase
            }

            & svg {
                font-size: 14px;
                margin-left: 5px;
                font-family: 'Poppins', sans-serif;
            }

        }
    }
`;

export const AlbumsContainer = styled.div`

    display: grid;
    margin-top: 45px;
    margin-left: 8%;
    width: 90%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    font-size: 15px;
    margin-bottom: 20em;
    
    & h2 {
        font-family: 'Poppins', sans-serif;
        color: white;
    }

    & > div {
        color: white;
        font-family: 'Poppins', sans-serif;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-column-gap: 25px;
        grid-row-gap: 20px;

        & div {
            display: grid;
            text-align: center;
            
            & span { 
                font-size: 14px;
                color: white;
            }
        }
    }

`;