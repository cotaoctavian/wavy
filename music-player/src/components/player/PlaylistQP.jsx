import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import Axios from 'axios';
import PlaylistSong from './PlaylistSong';
import playlistCover from '../../assets/images/playlist.png';
import { faSearch, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import wavy from '../../assets/images/white_wave.png';
import '../../assets/css/Global.css';
import { NavLink, useHistory } from 'react-router-dom';
import { Global, PlaylistHeader, PlaylistContainer } from '../../assets/styles/playlistSong';
import { Header, Links, Main } from '../../assets/styles/webplayer';
import { SnackbarProvider, useSnackbar } from 'notistack';
import jwt from 'jwt-decode'
import { setUpUser } from '../../actions/index';

const PlaylistQPNotification = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const history = useHistory();
    const [playlistTitle, setPlaylistTitle] = useState('')
    const [playlistSongs, setPlaylistSongs] = useState(null)
    const [showUpModal, setShowUpModal] = useState(false)
    const [newPlaylistTitle, setNewPlaylistTitle] = useState('')
    const [playlistImage, setPlaylistImage] = useState(null);
    const user = useSelector(state => state.user)
    
    useEffect(() => {
        document.body.classList.remove('dashboard-back')
        if (props.id !== undefined) {
            Axios.get(`http://localhost:5000/playlist/${props.id}`)
                .then(res => {
                    setPlaylistTitle(res.data.playlist.title);
                    setPlaylistSongs(res.data.playlist.songs);
                    if (res.data.playlist.songs.length > 0) {
                        Axios.post('http://localhost:5000/song/', { song: res.data.playlist.songs[0] })
                            .then(res => {
                                setPlaylistImage(res.data.info.photo_path);
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch(err => console.log(err))
        }
    }, [props.id, props.songs, props.songId, props.songIdState, user])

    // Trigger the modal to show/hide.
    const handleEdit = () => {
        setShowUpModal(!showUpModal)
    }

    // Handle delete playlist functionality
    const handleDelete = async () => {
        try {
            const result = await Axios.delete(`http://localhost:5000/playlist/track/${props.id}/${user.id}`)
            dispatch(setUpUser(jwt(result.data.token)))
            localStorage.setItem('token', result.data.token)
            history.push('/library/playlists')
        } catch (err) {

        }
    }

    const handleDeleteTrack = async (songId) => {
        try {
            const result = await Axios.delete(`http://localhost:5000/playlist/${props.id}/${songId}`);
            Axios.get(`http://localhost:5000/playlist/${props.id}`)
                .then(res => {
                    setPlaylistSongs(res.data.playlist.songs);
                })
                .catch(err => console.log(err))

            enqueueSnackbar(result.data.message, { variant: 'default'})
        } catch (err) {
            console.log(err)
        }
    }

    // Handle playlist edit title functionality.
    const handleSubmit = async () => {
        setPlaylistTitle(newPlaylistTitle)
        setShowUpModal(!showUpModal);
        setNewPlaylistTitle('');

        try {
            const result = await Axios.patch("http://localhost:5000/playlist", { id: props.id, title: newPlaylistTitle })
            enqueueSnackbar(result.data.message, { variant: 'default' });
        } catch (err) {
            console.log(err);
        }
    }

    let content = (
        <div>
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

                <NavLink exact to="/profile" className="header-nav-link"> <img src={`http://localhost:5000/${user.img}`} alt="" className="img__library" /> </NavLink>

            </Header>
            <PlaylistHeader>
                {playlistImage !== null ? <img src={`http://localhost:5000/${playlistImage}`} /> : <img src={playlistCover} alt="" />}
                <div>
                    <h2> {playlistTitle} </h2>
                    <span> Playlist &#8226; {user.username} </span>
                    <div>
                        <button onClick={handleEdit}> <FontAwesomeIcon icon={faPen} /> Edit playlist </button>
                        <button onClick={handleDelete}> <FontAwesomeIcon icon={faTrashAlt} /> Delete playlist </button>
                    </div>
                </div>
            </PlaylistHeader>

            <PlaylistContainer>
                {playlistSongs !== null ?
                    playlistSongs.map((song, index) => {
                        if(song === props.songId) return <PlaylistSong key={index} handleDeleteTrack={handleDeleteTrack} playlistId={props.id} id={song} songs={props.songs} handleLike={props.handleLike} handleUrl={props.handleUrl} hover={true} songState={props.songIdState} />
                        else return <PlaylistSong key={index} handleDeleteTrack={handleDeleteTrack} playlistId={props.id} id={song} songs={props.songs} handleLike={props.handleLike} handleUrl={props.handleUrl} hover={false} songState={false} />
                    }) : null
                }
            </PlaylistContainer>

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
                            value={newPlaylistTitle}
                            onChange={e => setNewPlaylistTitle(e.target.value)} />
                        <div>
                            <button onClick={handleEdit}> CANCEL </button>
                            <button onClick={handleSubmit}> SAVE </button>
                        </div>
                    </div>
                </Modal> : null}
        </div>
    );
    return content;
}

const PlaylistQP = (props) => {
    useEffect(() => {

    }, [props.songs, props.songId, props.songIdState])
    
    let content = (
        <SnackbarProvider maxSnack={1} preventDuplicate>
            <Global />
            <PlaylistQPNotification songId={props.songId} songs={props.songs} id={props.id} handleLike={props.handleLike} handleUrl={props.handleUrl} songIdState={props.songIdState} />
        </SnackbarProvider>
    );
    return content;
}

export default PlaylistQP;