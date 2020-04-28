import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import jwt from 'jwt-decode';

/* Icons and images */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import wavy from '../../assets/images/white_wave.png';

/* Styling */
import { Header, Global, Links, Main, Menu } from '../../assets/styles/webplayer';
import { PlaylistItem } from './Playlist';
import { MadeForYouContainer } from '../../assets/styles/made-for-you';
import '../../assets/css/Global.css';

const MadeForYou = ({ id, image }) => {

    const [recommendedPlaylist, setRecommendedPlaylist] = useState([])

    useEffect(() => {
        if (id !== undefined) {
            Axios.post("http://localhost:5001/recommended/verifyToken", { token: localStorage.getItem('playlist_token') })
                .then((response) => {
                    if (!response.data.result) {
                        Axios.post("http://localhost:5001/recommended/songs/genres", { userId: id })
                            .then(async (response) => {
                                let genres = response.data.result[0]
                                let tracks = []
                                for (let i = 0; i < genres.length; i++) {
                                    await Axios.post("http://localhost:5001/recommended/tracks", { userId: id, genre: genres[i], limit: parseInt(Math.ceil(10 / genres.length)) })
                                        .then((response) => {
                                            const songs = response.data.result
                                            for (let j = 0; j < songs.length; j++)
                                                tracks.push(songs[j])
                                        })
                                        .catch((err) => console.log(err))
                                }


                                Axios.post("http://localhost:5000/playlist/recommended", { userId: id, tracks: tracks })
                                    .then((response) => {
                                        setRecommendedPlaylist(response.data.result)

                                        Axios.post("http://localhost:5001/recommended/playlist_token", { playlist: response.data.result })
                                            .then((response) => {
                                                localStorage.setItem("playlist_token", response.data.token)
                                            })
                                            .catch((err) => console.log(err))
                                    })
                                    .catch(err => console.log(err))
                            })
                            .catch(err => console.log(err))
                    }
                    else {
                        const decoded_jwt = jwt(localStorage.getItem('playlist_token'))
                        setRecommendedPlaylist(decoded_jwt.playlist)
                    }
                })
                .catch(err => console.log(err))
        }

    }, [id])

    let content = (
        <React.Fragment>
            <Global />
            <Header>
                <div>
                    <img src={wavy} alt="" />
                    <span> <NavLink exact to="/player" className="header-nav-link">  wavy. </NavLink> </span>
                </div>

                <Links>
                    <span> <NavLink exact to="/player" className="header-player-link"> Home </NavLink> </span>
                    <span> <NavLink exact to="/hotlist" className="header-player-link"> Hotlist </NavLink></span>
                    <span> <NavLink exact to="/library/playlists" className="header-nav-link"> Library </NavLink></span>
                    <span> <NavLink exact to="/search" className="header-player-link"> <FontAwesomeIcon icon={faSearch} /> Search </NavLink> </span>
                </Links>

                {image.length > 0 ? <NavLink exact to="/profile" className="header-nav-link"> <img src={`http://localhost:5000/${image}`} className="img__library" alt="" /> </NavLink> : null}

            </Header>

            <Main>
                <Menu>
                    <span> <NavLink exact to="/library/playlists" className="main-player-link"> PLAYLISTS </NavLink> </span>
                    <span> <NavLink exact to="/library/albums" className="main-player-link"> ALBUMS </NavLink> </span>
                    <span> <NavLink exact to="/library/tracks" className="main-player-link"> LIKED SONGS </NavLink> </span>
                    <span> <NavLink exact to="/library/artists" className="main-player-link"> ARTISTS </NavLink> </span>
                    <span> <NavLink exact to="/library/made-for-you" className="main-nav-link"> MADE FOR YOU </NavLink> </span>
                </Menu>


                <MadeForYouContainer>
                    {recommendedPlaylist.length > 0 ?
                        <PlaylistItem id={recommendedPlaylist} />
                        : null}
                </MadeForYouContainer>

            </Main>

        </React.Fragment>
    );

    return content;
}

export default MadeForYou;