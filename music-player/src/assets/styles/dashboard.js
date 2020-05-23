import styled from 'styled-components';

export const SongContainer = styled.div`
    width: 350px;
    height: 350px;
    display: grid;

    & a {
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
            top: 45%;
            height: 0;
            padding-right: 10px;
            display: grid;
            grid-template-columns: 1fr;

            & > span:first-child {
                font-size: 18px;
                font-weight: 500;
                color: #45afed;
            }

            & > span {
                font-size: 14px;
                font-weight: 400;
                color: #45afed;
            }
        }

        & img {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-box-shadow: -1px 0px 16px 0px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: -1px 0px 16px 0px rgba(0, 0, 0, 0.75);
            box-shadow: -1px 0px 16px 0px rgba(0, 0, 0, 0.75);
        }
    }

    & a:hover img {
        filter: brightness(15%);
        transition: 0.2s linear;
    }

    & a:not(:hover) img {
        transition: 0.2s linear;
    }

    & a:hover div {
        opacity: 1;
    }
    
`;