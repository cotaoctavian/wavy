import styled from 'styled-components';

export const SearchBar = styled.div`
    display: grid;
    background-color: #1a1a1a;
    width: 100%;
    height: 100px;
    margin-top: 3.8em;
    justify-content: center;
    align-content: center;
    border-bottom: 1px solid #525252;
    -webkit-box-shadow: 2px 5px 19px 0px rgba(0,0,0,1);
    -moz-box-shadow: 2px 5px 19px 0px rgba(0,0,0,1);
    box-shadow: 2px 5px 19px 0px rgba(0,0,0,1); 

    & input[type="search"] {
        width: 45em;
        height: 2.5em;
        background-color: #1a1a1a;
        border: 1px solid #525252;
        outline: none;
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        padding: 0px 10px;
    }

    & input[type="search"]::-webkit-search-cancel-button{
        -webkit-appearance: none;

        display: inline-block;
        width: 13px;
        height: 13px;
        border: 7px solid rgba(26, 26, 26,1);
        color: #525252;
        cursor: pointer;
        background:
        linear-gradient(45deg, rgba(82, 82, 82,0) 0%,rgba(82, 82, 82,0) 43%,#525252 45%,#525252 55%,rgba(82, 82, 82,0) 57%,rgba(82, 82, 82,0) 100%),
        linear-gradient(135deg, rgba(26, 26, 26,1) 0%, rgba(26, 26, 26,1) 43%,#525252 45%,#525252 55%,rgba(26, 26, 26,1) 57%,rgba(26, 26, 26,1) 100%);
    }

    & input[type="search"]::-webkit-search-cancel-button:hover{
        background:
        linear-gradient(45deg, rgba(82, 82, 82,0) 0%,rgba(82, 82, 82,0) 43%,#fff 45%,#fff 55%,rgba(82, 82, 82,0) 57%,rgba(82, 82, 82,0) 100%),
        linear-gradient(135deg, rgba(26, 26, 26,1) 0%, rgba(26, 26, 26,1) 43%,#fff 45%,#fff 55%,rgba(26, 26, 26,1) 57%,rgba(26, 26, 26,1) 100%);
    }
`;


export const SearchContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 2em;
    width: 99%;
    background-color: #1a1a1a;
    margin-top: 1%;
    margin-left: 1%;
    color: white;
    font-family: 'Poppins', sans-serif;

    & h2 {
        margin-left: 5px;
    }
`;

export const TopResult = styled.div`
    background-color: #2b2b2b;
    color: white;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: 25vh;
    width: 33vh;
    border-radius: 5%;
    font-family: 'Poppins', sans-serif;

    & img {
        margin-top: 1.5em;
        margin-left: 1.5em;
        width: 15vh;
        height: 15vh;
        border-radius: 5%;
    }

    & > span {
        margin-top: 5px;
        margin-left: 1.3em;
        font-size: 18px;
        font-weight: bold;
        font-family: 'Poppins', sans-serif;

    }

    & > div {
        display: flex;
        width: 55%;
        margin-left: 1.5em;
        padding-bottom: 1em;

        & > span {
            flex: 0.7;
            font-size: 12px;
            font-family: 'Poppins', sans-serif;
        }

        & span:nth-child(2) {
            flex: 0.3;
            background-color: #1e1e1e;
            border-radius: 10px;
            font-family: 'Poppins', sans-serif;
        }
    }
`;


export const TopResultWithSongs = styled.div`
    display: grid;
    grid-template-columns: 0.25fr 1fr;
    grid-template-rows: 1fr;  
`;

export const SearchSong = styled.div`
    display: grid;
    grid-template-columns: 0.01fr 0.25fr 0.9fr 0.01fr;
    width: 61%;
    padding-top: 23px;
    border-bottom: 0.05px solid #bdbdbd;
    justify-content: center;

    & div {
        padding-right: 50px;
        position: relative;

        & button {
            background-color: #1a1a1a;
            position: absolute;
        }

        & svg {
            position: absolute;
            left: 38%;
            top: 22%;
            color: white;
            opacity: 0;
            padding-right: 10px;
            font-size: 12px;
        }

        & img {
            width: 35px;
            height: 35px;
            border-radius: 5px;
        }
    }

    & div:hover button {
        opacity: 0.4;
    }

    & div:hover svg{
        opacity: 1;
    }
    
    & span {
        color: white;
        padding: 5px;
        font-family: 'Poppins';
        margin-bottom: 20px;
    }

    & span:nth-child(3) {
        color: #c7c7c7;
    }

    & button {
        background-color: #1a1a1a;
        border: 0;
        outline: none;
        cursor: pointer;
        margin-bottom: 20px;
    }
`;


export const HoveredSearchSong = styled.div`
    display: grid;
    grid-template-columns: 0.01fr 0.25fr 0.9fr 0.01fr;
    width: 61%;
    padding-top: 23px;
    border-bottom: 0.05px solid #bdbdbd;
    justify-content: center;
    background-color: #212121;

    & div {
        padding-right: 50px;
        position: relative;

        & button {
            background-color: #212121;
            position: absolute;
        }

        & svg {
            position: absolute;
            left: 38%;
            top: 22%;
            color: white;
            opacity: 0;
            padding-right: 10px;
            font-size: 12px;
        }

        & img {
            width: 35px;
            height: 35px;
            border-radius: 5px;
        }
    }

    & div:hover button {
        opacity: 0.4;
    }

    & div:hover svg{
        opacity: 1;
    }
    
    & span {
        color: white;
        padding: 5px;
        font-family: 'Poppins';
        margin-bottom: 20px;
    }

    & span:nth-child(3) {
        color: #c7c7c7;
    }

    & button {
        background-color: #212121;
        border: 0;
        outline: none;
        cursor: pointer;
        margin-bottom: 20px;
    }
`;

export const AlbumsList = styled.div`
    display: grid;
    width: 70%;
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

export const ArtistsList = styled.div`
    color: white;
    font-family: 'Poppins', sans-serif;
    width: 70%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-column-gap: 25px;
    grid-row-gap: 20px;
    margin-bottom: 20em;
    margin-top: -2em;
`;
