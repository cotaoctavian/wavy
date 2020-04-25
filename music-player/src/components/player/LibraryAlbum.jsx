import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* IMAGES AND ICONS */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import wavy from '../../assets/images/white_wave.png';

/* STYLING */
import '../../assets/css/Global.css';
import { Header, Global, Links, Main, Menu } from '../../assets/styles/webplayer';
import { LibraryAlbumContainer } from '../../assets/styles/libraryAlbum';
import Modal from 'react-modal';


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
                    <span> <NavLink exact to="/library/playlists" className="header-nav-link"> Library </NavLink></span>
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

                    {albums.length === 0 ? <h3> No albums available in your library. 😥 </h3> : null}

                    <div>
                        {albums.length !== 0 ?
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