import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    body {
        margin: 0;
        background-color:#1a1a1a;
    }
`;

export const PlaylistHeader = styled.div`
    background-color: black;
    display: flex;
    flex-direction: row;
    font-family: 'Poppins', sans-serif;

    & img {
        flex: 0.15;
        width: 260px;
        height: 260px;
        border-radius: 10px;
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

        & h2 {
            color: white;
            font-size: 35px;
        }

        & span {
            color: #c9c9c9;
        } 

        & div {
            display: flex;
            margin: 20px 0px 0px 0px;

            & button:nth-child(1) {
                background-color: #c9c9c9;
                color: black;
                border: 2px solid #c9c9c9;
                border-radius: 5px;
                padding: 10px 20px 10px 20px;
                margin-right: 20px;
                font-family: 'Poppins', sans-serif;
                font-weight: 500;
                outline: none;
                cursor: pointer;
            }

            & button:nth-child(2) {
                background-color: black;
                color: white;
                border: 2px solid white;
                border-radius: 5px;
                padding: 10px 20px 10px 20px;
                font-family: 'Poppins', sans-serif;
                outline: none;
                cursor: pointer;
            }
        }
    }
`;

export const PlaylistContainer = styled.div`
    display: grid;
    margin-top: 45px;
    margin-left: 8%;
    width: 90%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    max-height: 600px;
    font-size: 15px;
    margin-bottom: 20em;

    -webkit-animation: fadein 1.5s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 1.5s; /* Firefox < 16 */
        -ms-animation: fadein 1.5s; /* Internet Explorer */
         -o-animation: fadein 1.5s; /* Opera < 12.1 */
            animation: fadein 1.5s;


    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Internet Explorer */
    @-ms-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Opera < 12.1 */
    @-o-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    & h2 {
        color: white;
        font-family: 'Poppins', sans-serif;
    }
`;


export const PlaylistItem = styled.div`
    display: grid;
    grid-template-columns: 0.01fr 0.25fr 0.2fr 0.30fr 0.001fr 0.10fr 0.15fr 0.05fr;
    width: 80%;
    padding-top: 15px;
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

    & span:nth-child(4) {
        color: #c7c7c7;
    }

    
    & span:nth-child(8) {
        text-align: right;
        color: #c7c7c7;
    }

    & button {
        background-color: #1a1a1a;
        border: 0;
        outline: none;
        cursor: pointer;
        margin-bottom: 20px;
    }

    & button:nth-child(7) {
        text-align: left;
    }

`;

export const HoveredPlaylistItem = styled.div`
    display: grid;
    grid-template-columns: 0.01fr 0.25fr 0.2fr 0.30fr 0.001fr 0.10fr 0.15fr 0.05fr;
    width: 80%;
    padding-top: 15px;
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

    & span:nth-child(4) {
        color: #c7c7c7;
    }

    
    & span:nth-child(8) {
        text-align: right;
        color: #c7c7c7;
    }

    & button {
        background-color: #212121;
        border: 0;
        outline: none;
        cursor: pointer;
        margin-bottom: 20px;
    }

    & button:nth-child(7) {
        text-align: left;
    }


`;
