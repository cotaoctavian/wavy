import styled from 'styled-components';

export const MainContainer = styled.div`
    margin: 7em auto 7em auto;

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

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 2em;
    width: 80%;
    background-color: black;
    padding: 2.5em 1em;
    border-radius: 5px;

    & > div {
        margin: auto;

        & > img {
            width: 45em;
            height: 30em;
        }
    }
`;


export const SongContainer = styled.div`
    width: 45em;
    height: 30em;
    display: grid;
    font-family: 'Poppins', sans-serif;

    & div {
        position: relative;
        display: grid;
        width: 100%;
        height: 100%;
        justify-content: center;
        text-decoration: none;
        cursor: pointer;

        & div {
            position: relative;
            opacity: 0;
            text-align: center;
            top: 40%;
            height: 0;
            padding-right: 10px;
            display: grid;
            grid-template-columns: 1fr;

            & > span:first-child {
                font-size: 25px;
                font-weight: 500;
                color: white;
            }

            & > span {
                font-size: 20px;
                font-weight: 400;
                color: #45afed;
            }

            & > svg {
                color: white;
                justify-self: center;
                width: 3em;
                height: 3em;
                transition: .1s linear;
            }

            & > svg:hover { 
                transform: scale(1.1);
            }
        
        }

        & img {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-box-shadow: -1px 0px 16px 0px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: -1px 0px 16px 0px rgba(0, 0, 0, 0.75);
            box-shadow: -1px 0px 16px 0px rgba(0, 0, 0, 0.75);

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

    & > div:hover img {
        filter: brightness(15%);
        transition: 0.2s linear;
        transform: scale(1.05);
    }

    & > div:not(:hover) img {
        transition: 0.2s linear;
    }

    & > div:hover div {
        opacity: 1;
    }
    
`;
