import styled from 'styled-components';

export const LibraryAlbumContainer = styled.div`
    display: grid;
    margin-left: 65px;
    width: 90%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    font-size: 15px;
    margin-bottom: 20em;

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
            display: grid;
            
            & span { 
                font-size: 14px;
                color: white;
                margin-left: 7px;
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
    }

`;