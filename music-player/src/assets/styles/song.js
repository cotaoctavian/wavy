import styled from 'styled-components';

export const SongDiv = styled.div`
    display: flex;
    margin-top: 10px;
    margin-left: 40px;
    & span {
        flex: 1;
        color: white;
        padding: 10px;
        font-family: 'Poppins';
    } 

    & button {
        background-color: #1a1a1a;
        border: 0;
        outline: none;
        cursor: pointer;
    }
`;