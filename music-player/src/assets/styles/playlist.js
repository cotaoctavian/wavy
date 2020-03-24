import styled from 'styled-components';

export const PlaylistContainer = styled.div`
    color: white;
    font-family: 'Poppins', sans-serif;
    margin-left: 62px;
    margin-top: 25px;
    width: 70%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-column-gap: 25px;
    grid-row-gap: 20px; 

    & button {
        background-color: #363636;
        color: #cccccc;
        font-size: 23px;
        font-family: 'Poppins', sans-serif;
        border: 1px solid #363636;
        border-radius: 10px;
        width: 150px;
        height: 150px;
        outline: none;
        margin-bottom: 8px;
        cursor: pointer;
    }

    & span {
        font-size: 14px;
        margin-left: 5px;
    }
    
`;