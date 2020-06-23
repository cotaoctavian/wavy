import styled from 'styled-components';

export const PlaylistContainer = styled.div`
    color: white;
    font-family: 'Poppins', sans-serif;
    width: 70%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-column-gap: 25px;
    grid-row-gap: 20px; 
    margin-left: 62px;

    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
        -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;

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