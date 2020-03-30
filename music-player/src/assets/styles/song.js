import styled from 'styled-components';

export const SongDiv = styled.div`
    display: grid;
    grid-template-columns: 0.01fr 0.25fr 0.25fr 0.25fr 0.1fr 0.20fr 0.05fr;
    width: 90%;
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

    
    & span:nth-child(7) {
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

    & button:nth-child(6) {
        text-align: left;
    }

`;

export const HoveredSongDiv = styled.div`
    display: grid;
    grid-template-columns: 0.01fr 0.25fr 0.25fr 0.25fr 0.1fr 0.20fr 0.05fr;
    width: 90%;
    border-bottom: 0.05px solid #bdbdbd;
    justify-content: center;
    background-color: #212121;
    padding-top: 15px;

    & div {

        padding-right: 50px;
        position: relative;

        & button {
            position: absolute;
            background-color: #212121;
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

    
    & span:nth-child(7) {
        text-align: right;
        color: #c7c7c7;
    }

    & button {
        background-color: #1a1a1a;
        border: 0;
        outline: none;
        cursor: pointer;
        margin-bottom: 20px;
        background-color: #212121;
    }

    & button:nth-child(6) {
        text-align: left;
    }
`;