import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Header, Global, Links, Main } from '../../assets/styles/webplayer';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import wavy from '../../assets/images/white_wave.png';
import '../../assets/css/Global.css';
import Library from './Library';
import LikedSongs from './LikedSongs';
import Player from './Player';
import HomePlayer from './HomePlayer';

const WebPlayer = props => {

    // const user = useSelector(state => state.user)
    const [songUrl, setSongUrl] = useState('')
    const urlPathname = window.location.pathname

    const handleUrl = (url) => {
        setSongUrl(url)
    }

    let content = (
        <React.Fragment>
            {urlPathname === "/player" ? <HomePlayer handle={handleUrl} /> : null}
            {urlPathname === "/library" ? <Library handle={handleUrl} /> : null}
            {urlPathname === "/library/tracks" ? <LikedSongs handle={handleUrl} /> : null}
            {songUrl.length > 0 ? <Player url={`http://localhost:5000/${songUrl}`} /> : null}
        </React.Fragment>
    );
    return content;
}


export default WebPlayer