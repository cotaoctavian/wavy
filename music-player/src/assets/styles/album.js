import styled from 'styled-components';

export const AlbumHeader = styled.div`
    background-color: black;
    display: flex;
    flex-direction: row;
    font-family: 'Poppins', sans-serif;

    & img {
        flex: 0.15;
        width: 180px;
        height: 250px;
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
                background-color: white;
                color: black;
                border: 2px solid white;
                border-radius: 5px;
                padding: 10px 20px 10px 20px;
                width: 10%;
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
                
                & svg {
                    font-size: 22px;
                    vertical-align: middle;
                    display: inline-block;
                    margin: 0;
                    padding: 0;
                    text-align: center;
                }
            }
        }
    }
`;


export const AlbumContainer = styled.div`
    display: grid;
    margin-top: 45px;
    margin-left: 8%;
    width: 90%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    font-size: 15px;
    margin-bottom: 10em;

    & h2 {
        color: white;
        font-family: 'Poppins', sans-serif;
    }

    -webkit-animation: fadein 3s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 3s; /* Firefox < 16 */
        -ms-animation: fadein 3s; /* Internet Explorer */
         -o-animation: fadein 3s; /* Opera < 12.1 */
            animation: fadein 3s;


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
`;
