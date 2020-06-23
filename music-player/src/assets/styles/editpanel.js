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
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 2.5em;
    padding-left: 1.5em;
    padding-top: 1.5em;

    & > span {
        font-size: 22px;
        font-weight: bold;
    }
`;

export const AlbumContainer = styled.div`
    width: 100%;
    height: 6em;
    background-color: #ebeef2;
    display: flex; 
    align-items: center;
    padding-left: 0.8em;
    border-radius: 5px;
    padding-right: 1em;
    border: 2px solid black;

    & img {
        width: 4.5em;
        height: 4.5em;
        flex: 1;
        border-radius: 5px;
        transition: 0.2s linear;
    }

    & span {
        flex: 3;
        padding-left: 1em;
    }

    & svg {
        flex: 0.7;
        cursor: pointer;
        font-size: 25px;
        transition: 0.3s linear;
    }

    & svg:hover {
        color: #ff887a;
    }

    & svg:nth-child(2) {
        padding-right: 5em;
    }
`;