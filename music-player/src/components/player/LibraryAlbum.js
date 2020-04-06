import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { Header, Global, Links, Main, Menu } from '../../assets/styles/webplayer';
import { PlaylistContainer } from '../../assets/styles/playlist';
import wavy from '../../assets/images/white_wave.png';
import playlistCover from '../../assets/images/playlist.png';
import '../../assets/css/Global.css';
import liked_songs from '../../assets/images/liked_songs.gif';
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import jwt from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { setUpUser } from '../../actions/index';
import { LibraryAlbumContainer } from '../../assets/styles/libraryAlbum';

Modal.setAppElement("#root");

const AlbumItem = ({ id }) => {

    const [albumData, setAlbumData] = useState(null)

    useEffect(() => {
        Axios.get(`http://localhost:5000/album/${id}`)
            .then(res => {
                setAlbumData(res.data.album)
            })
            .catch(err => console.log(err))
    }, [])

    let content = (
        <div>
            {albumData !== null ?
                <React.Fragment>
                    <NavLink exact to={`/library/album/${id}`} className="squared-nav-link"> <img src={`http://localhost:5000/${albumData.photo}`} /> </NavLink>
                    <span> {albumData.name} </span>
                </React.Fragment>
                :
                null}
        </div>
    );
    return content;
}

const LibraryAlbum = ({ image }) => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.user.albums)

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
                    <span> <NavLink exact to="/library" className="header-nav-link"> Library </NavLink></span>
                    <span> <NavLink exact to="/search" className="header-player-link"> <FontAwesomeIcon icon={faSearch} /> Search </NavLink> </span>
                </Links>

                {image.length > 0 ? <NavLink exact to="/profile" className="header-nav-link"> <img src={`http://localhost:5000/${image}`} className="img__library" alt="" /> </NavLink> : null}

            </Header>

            <Main>
                <Menu>
                    <span> <NavLink exact to="/library/playlists" className="main-player-link"> PLAYLISTS </NavLink> </span>
                    <span> <NavLink exact to="/library/albums" className="main-nav-link"> ALBUMS </NavLink> </span>
                    <span> <NavLink exact to="/library/tracks" className="main-player-link"> LIKED SONGS </NavLink> </span>
                    <span> <NavLink exact to="/library/artists" className="main-player-link"> ARTISTS </NavLink> </span>
                    <span> <NavLink exact to="/library/made-for-you" className="main-player-link"> MADE FOR YOU </NavLink> </span>
                </Menu>

                <LibraryAlbumContainer>
                    <div>
                        {albums !== null ?
                            albums.map((album, index) => {
                                return (<AlbumItem key={index} id={album}> {album} </AlbumItem>)
                            })
                            : null}
                    </div>
                </LibraryAlbumContainer>

            </Main>
        </React.Fragment>
    );
    return content;
}

export default LibraryAlbum;