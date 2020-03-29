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

Modal.setAppElement("#root");

const PlaylistItem = (props) => {
    const [title, setTitle] = useState('')
    // const [playlistId, setPlaylistId] = useState(null)
    const [playlistImage, setPlaylistImage] = useState(null)

    useEffect(() => {
        Axios.post("http://localhost:5000/playlist/", {id: props.id})
            .then((res) => {
                setTitle(res.data.playlist.title)
                if (res.data.playlist.songs.length > 0) {
                    Axios.post('http://localhost:5000/song/', { song: res.data.playlist.songs[0] })
                        .then(res => {
                            setPlaylistImage(res.data.info.photo_path);
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }, [props.id, playlistImage])

    let content = (
        <div>
            <NavLink exact to={`/library/playlists/${props.id}`}  className="squared-nav-link"> {playlistImage !== null ? <img src={`http://localhost:5000/${playlistImage}`} /> : <img src={playlistCover} alt="Liked songs" />} </NavLink>
            <span> {title} </span>
        </div>
    );
    return content;
}

const Playlist = (props) => {

    const [showUpModal, setShowUpModal] = useState(false)
    const [playlistTitle, setPlaylistTitle] = useState('')
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.user.playlists)

    const handlePlaylistClick = () => {
        setShowUpModal(!showUpModal)
    }

    const handleSubmit = async () => {
        setShowUpModal(false);
        setPlaylistTitle('');
        try {
            const res = await Axios.post("http://localhost:5000/playlist/add", { title: playlistTitle, userId: props.userId })
            dispatch(setUpUser(jwt(res.data.token)));
            localStorage.setItem('token', res.data.token);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { }, [showUpModal])

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

                {props.image.length > 0 ? <NavLink exact to="/profile" className="header-nav-link"> <img src={`http://localhost:5000/${props.image}`} className="img__library" alt="" /> </NavLink> : null}

            </Header>

            <Main>
                <Menu>
                    <span> <NavLink exact to="/library/playlists" className="main-nav-link"> PLAYLISTS </NavLink> </span>
                    <span> <NavLink exact to="/library/albums" className="main-player-link"> ALBUMS </NavLink> </span>
                    <span> <NavLink exact to="/library/tracks" className="main-player-link"> LIKED SONGS </NavLink> </span>
                    <span> <NavLink exact to="/library/artists" className="main-player-link"> ARTISTS </NavLink> </span>
                    <span> <NavLink exact to="/library/made-for-you" className="main-player-link"> MADE FOR YOU </NavLink> </span>
                </Menu>

                <PlaylistContainer>
                    <div>
                        <button onClick={handlePlaylistClick}> <FontAwesomeIcon icon={faPlus} /> </button>
                        <span> New playlist </span>
                    </div>
                    <div>
                        <NavLink exact to="/library/tracks" className="squared-nav-link"> <img src={liked_songs} alt="Liked songs" /> </NavLink>
                        <span> Liked songs </span>
                    </div>

                    {playlists.map((item, index) => {
                        return <PlaylistItem key={index} id={item} />
                    })}

                </PlaylistContainer>

            </Main>
            {showUpModal ?
                <Modal
                    isOpen={showUpModal}
                    onRequestClose={() => setShowUpModal(false)}
                    className="modal"
                    overlayClassName="overlay"
                >
                    <div>
                        <span> New playlist </span>
                        <input
                            type="text"
                            placeholder="Title"
                            required
                            value={playlistTitle}
                            onChange={e => setPlaylistTitle(e.target.value)} />
                        <div>
                            <button onClick={handlePlaylistClick}> CANCEL </button>
                            <button onClick={handleSubmit}> SAVE </button>
                        </div>
                    </div>
                </Modal> : null}
        </React.Fragment>
    );
    return content;
}

export default Playlist;