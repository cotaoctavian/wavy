import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Player from './Player';
import { Header, Global, Links, Main } from '../assets/styles/webplayer';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import wavy from '../assets/images/white_wave.png';
import '../assets/css/Global.css';

const WebPlayer = props => {

    const user = useSelector(state => state.user)
    
    let content = (
        <React.Fragment>
            <Global />
            <Header>
                <div>
                    <img src={wavy} alt="" />
                    <span> <NavLink exact to="/player" className="header-nav-link">  wavy. </NavLink> </span>
                </div>

                <Links>
                    <span> <NavLink exact to="/player" className="header-nav-link"> Home </NavLink> </span>
                    <span> <NavLink exact to="/hotlist" className="header-player-link"> Hotlist </NavLink></span>
                    <span> <NavLink exact to="/library" className="header-player-link"> Library </NavLink></span>
                    <span> <NavLink exact to="/search" className="header-player-link"> <FontAwesomeIcon icon={faSearch} /> Search </NavLink> </span>
                </Links>

                <NavLink exact to="/profile" className="header-nav-link"> <img src={`http://localhost:5000/${user.img}`} alt="" className="img__library"/> </NavLink>

            </Header>

            <Main>

            </Main>

        </React.Fragment>
    );
    return content;
}


export default WebPlayer