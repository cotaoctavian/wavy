import styled from 'styled-components';


export const RecommendedSongs = styled.div`

    display: grid;
    margin-left: 3%;
    width: 90%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    font-size: 15px;
    margin-top: 4em;
    margin-bottom: 1em;
    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
         -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;


    & h3 {
        font-family: 'Poppins', sans-serif;
        color: white;
    }

    & h2 {
        font-family: 'Poppins', sans-serif;
        color: white;
    }

    & h1 {
        font-family: 'Poppins', sans-serif;
        color: white;
    }

    & > div {
        color: white;
        font-family: 'Poppins', sans-serif;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-column-gap: 25px;
        grid-row-gap: 20px;
        width: 100%;

        & span {
            
        }
    }

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

export const SongContainer = styled.div`
    width: 100%;
    padding-left: 10px;
    background-color: #2b2b2b;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.1fr 1fr;
    border-radius: 10px;
    height: 240px;

    & div {
        width: 80%;
        height: 10%;
        & span {
            font-size: 14px;
        }
    }

    & button {
        background-color: #2b2b2b;
        border: 1px solid #2b2b2b;
        cursor: pointer;
        outline: none;
        width: 0px;
        height: 0px;
        margin-top: 2em;
        margin-left: 7.5em;
    }

    & img {
        margin-top: 10px;
        width: 130px;
        height: 130px;
        border-radius: 10px;
    }

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
`;

export const RecommendedAlbumsContainer = styled.div`
    display: grid;
    margin-left: 3%;
    width: 90%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    font-size: 15px;

    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
         -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;

    & h1 {
        font-family: 'Poppins', sans-serif;
        color: white;
    }
    
    & h2 {
        font-family: 'Poppins', sans-serif;
        color: white;
    }

    & h3 {
        font-family: 'Poppins', sans-serif;
        color: white;
    }

    & > div {
        color: white;
        font-family: 'Poppins', sans-serif;
        width: 150px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-column-gap: 25px;
        grid-row-gap: 20px;

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
    

        & div {
            display: grid;
            
            & span { 
                font-size: 14px;
                color: white;
                margin-left: 7px;
            }
        }
    }

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

export const RecommendedArtistsContainer = styled.div`
    display: grid;
    margin-left: 3%;
    width: 90%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    font-size: 15px;
    margin-bottom: 10em;

    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
         -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;

    & h1 {
        font-family: 'Poppins', sans-serif;
        color: white;
    }
    
    & h2 {
        font-family: 'Poppins', sans-serif;
        color: white;
    }

    & h3 {
        font-family: 'Poppins', sans-serif;
        color: white;
    }

    & > div {
        color: white;
        font-family: 'Poppins', sans-serif;
        width: 150px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-column-gap: 25px;
        grid-row-gap: 20px;

        & div {
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
                }
            }

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


export const LoadingContainer = styled.div`
    position: absolute;
    top: 45%;
    left: 48%;
`;


export const NothingFoundContainer = styled.div`
    margin: auto;
    margin-top: 12em;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: 'Poppins', sans-serif;
    color: white;

    & img {
        height: 30em;
        width: 30em;
    }
`;