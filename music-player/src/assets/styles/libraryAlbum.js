import styled from 'styled-components';

export const LibraryAlbumContainer = styled.div`
    display: grid;
    margin-left: 3%;
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
            
            & span { 
                font-size: 14px;
                color: white;
                margin-left: 7px;
            }
        }
    }

`;