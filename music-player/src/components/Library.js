import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Player from './Player';
import { Header, Global, Links, Main, Menu } from '../assets/styles/webplayer';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import wavy from '../assets/images/white_wave.png';
import '../assets/css/Global.css';

const Library = props => {

    const [url, setUrl] = useState('')

    let content = (
        <React.Fragment>
            <Global />
            <Header>
                <div>
                    <img src={wavy} alt="" />
                    <span> <NavLink exact to ="/player" className="header-nav-link">  wavy. </NavLink> </span>
                </div>

                <Links>
                    <span> <NavLink exact to="/player"  className="header-player-link"> Home </NavLink> </span>
                    <span> <NavLink exact to="/hotlist" className="header-player-link"> Hotlist </NavLink></span>
                    <span> <NavLink exact to="/library" className="header-nav-link"> Library </NavLink></span>
                    <span> <NavLink exact to="/search" className="header-player-link"> <FontAwesomeIcon icon={faSearch}/> Search </NavLink> </span>
                </Links>

                <NavLink exact to="/profile" className="header-nav-link"> <img src={"http://localhost:5000/images/user_avatar.svg"} alt="" /> </NavLink>

            </Header>

            <Main>
                <Menu> 
                    <span> <NavLink exact to="/library/playlists"  className="main-player-link"> PLAYLISTS </NavLink> </span>
                    <span> <NavLink exact to="/library/albums" className="main-player-link"> ALBUMS </NavLink> </span>
                    <span> <NavLink exact to="/library/tracks" className="main-player-link"> LIKED SONGS </NavLink> </span>
                    <span> <NavLink exact to="/library/artists" className="main-player-link"> ARTISTS </NavLink> </span>
                    <span> <NavLink exact to="/library/made-for-you" className="main-player-link"> MADE FOR YOU </NavLink> </span>
                </Menu>
            </Main>

            <Player url={url} />
        </React.Fragment>
    );
    return content;
}

export default Library