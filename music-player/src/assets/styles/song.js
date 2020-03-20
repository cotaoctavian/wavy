import styled from 'styled-components';

export const SongDiv = styled.div`
    display: grid;
    grid-template-columns: 0fr 0.3fr 0.3fr 0.2fr 0fr 0.1fr;
    width: 90%;
    margin-top: 15px;
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

    
    & span:nth-child(6) {
        margin-left: 40px;
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