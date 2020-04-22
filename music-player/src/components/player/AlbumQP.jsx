import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

/* REDUX */
import { useSelector, useDispatch } from 'react-redux';
import jwt from 'jwt-decode'
import { setUpUser } from '../../actions/index';


/* EXTERNAL LIBRARIES */
import Axios from 'axios';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Modal from 'react-modal';

/* ICONS AND IMAGES */
import { faSearch, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import DeleteIcon from '@material-ui/icons/Delete';

/* STYLING */
import { Global } from '../../assets/styles/playlistSong';
import { AlbumHeader, AlbumContainer } from '../../assets/styles/album';
import { Header, Links, Main } from '../../assets/styles/webplayer';
import wavy from '../../assets/images/white_wave.png';
import '../../assets/css/Global.css';
import { SongDiv, HoveredSongDiv } from '../../assets/styles/song';

const ModalItem = ({ playlistId, handleAddToPlaylist }) => {

    const [title, setTitle] = useState('')

    useEffect(() => {
        Axios.post("http://localhost:5000/playlist/", { id: playlistId })
            .then((res) => {
                setTitle(res.data.playlist.title)
            })
            .catch(err => console.log(err))
    }, [])

    const triggerAddToPlaylist = () => {
        handleAddToPlaylist(playlistId)
    }

    return (
        <button onClick={triggerAddToPlaylist}> {title} </button>
    );
}


const AlbumTrack = ({ albumId, id, handleLike, songs, handleUrl, hover, songState }) => {
    const [songInfo, setSongInfo] = useState('')
    const [like, setLike] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [showUpModal, setShowUpModal] = useState(false)
    const playlists = useSelector(state => state.user.playlists)

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (id !== undefined) {
            Axios.post('http://localhost:5000/song/', { song: id })
                .then(res => {
                    setSongInfo(res.data.info);
                })
                .catch(err => console.log(err))

            let i;
            for (i = 0; i < songs.length; i++) {
                if (songs[i] === id) setLike(true)
            }
        
            setPlaying(songState)
        }
    }, [id, songs, playing, songState])

    useEffect(() => {
        return () => {
            setLike(false);
        }
    }, [songs])

    const togglePlay = () => {
        setPlaying(!playing);
        handleUrl(songInfo.path, !playing, id);
        localStorage.setItem('artist_singles', null)
        localStorage.setItem('playlist', null);
        localStorage.setItem('album', albumId);
    }

    const triggerModal = () => {
        setShowUpModal(true)
    }

    const toggleLike = () => {
        setLike(!like)
        handleLike(!like, songInfo.path);
    }

    const handleAddToPlaylist = async (playlistId) => {
        setShowUpModal(false)
        try {
            const response = await Axios.post("http://localhost:5000/playlist/track", { playlistId: playlistId, trackId: id })
            enqueueSnackbar(response.data.message, { variant: 'default' })
        } catch (err) {

        }
    }

    let content = (
        <React.Fragment>
            {!hover ?
                <SongDiv>
                    <div>
                        <button onClick={togglePlay}>
                            {songInfo.photo_path ? <img src={`http://localhost:5000/${songInfo.photo_path}`} alt="" /> : null}
                        </button>
                        {playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                    </div>
                    <span> {songInfo.title} </span>
                    <span> {songInfo.artist} </span>
                    <span> {songInfo.album} </span>
                    <button onClick={toggleLike}> {like ? <FavoriteIcon style={{ color: "white" }} /> : <FavoriteBorderIcon style={{ color: "#c7c7c7" }} />} </button>
                    <button onClick={triggerModal}> <PlaylistAddIcon style={{ color: "white" }} /> </button>
                    <span> {songInfo.duration} </span>
                </SongDiv>
                :
                <HoveredSongDiv>
                    <div>
                        <button onClick={togglePlay}>
                            {songInfo.photo_path ? <img src={`http://localhost:5000/${songInfo.photo_path}`} alt="" /> : null}
                        </button>
                        {playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                    </div>
                    <span> {songInfo.title} </span>
                    <span> {songInfo.artist} </span>
                    <span> {songInfo.album} </span>
                    <button onClick={toggleLike}> {like ? <FavoriteIcon style={{ color: "white" }} /> : <FavoriteBorderIcon style={{ color: "#c7c7c7" }} />} </button>
                    <button onClick={triggerModal}> <PlaylistAddIcon style={{ color: "white" }} /> </button>
                    <span> {songInfo.duration} </span>
                </HoveredSongDiv>}

            {showUpModal ? <Modal
                isOpen={showUpModal}
                onRequestClose={() => setShowUpModal(false)}
                className="song-modal"
                overlayClassName="overlay">

                <div>
                    <h3> Add to playlist </h3>
                    <div>
                        {playlists.length > 0 ? playlists.map((playlist, index) => {
                            return <ModalItem key={index} playlistId={playlist} handleAddToPlaylist={handleAddToPlaylist}> {playlist} </ModalItem>
                        }) : (<p> No playlist found. 😥</p>)}
                    </div>
                </div>

            </Modal> : null}

        </React.Fragment >
    );
    return content;
}

const AlbumQPNotification = ({ id, songId, handleLike, songs, handleUrl, songIdState }) => {
    const user = useSelector(state => state.user)
    const [album, setAlbum] = useState(null)
    const [addedToLibrary, setAddedToLibrary] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    useEffect(() => {
        Axios.get(`http://localhost:5000/album/${id}`)
            .then(res => {
                setAlbum(res.data.album);
            })
            .catch(err => console.log(err))

        let i;
        const albums = user.albums
        if (albums !== undefined) {
            for (i = 0; i < albums.length; i++) {
                if (id === albums[i]) setAddedToLibrary(true);
            }
        }

    }, [])

    const handlePlay = () => {
        Axios.post('http://localhost:5000/song/', { song: album.tracks[0] })
            .then(res => {
                handleUrl(res.data.info.path, true, album.tracks[0]);
            })
            .catch(err => console.log(err))

        localStorage.setItem('artist_singles', null)
        localStorage.setItem('playlist', null);
        localStorage.setItem('album', id);
    }

    const handleAddToLibrary = async () => {
        try {
            const result = await Axios.post(`http://localhost:5000/album/${user.id}/${id}/${album.name}`)
            enqueueSnackbar(result.data.message, { variant: 'default' })
            localStorage.setItem('token', result.data.token);
            dispatch(setUpUser(jwt(result.data.token)))
        } catch (err) {
            enqueueSnackbar(err.response.data.message, { variant: 'default' })
        }
        setAddedToLibrary(true)
    }

    const handleDeleteFromLibrary = async () => {
        try {
            const result = await Axios.delete(`http://localhost:5000/album/${user.id}/${id}/${album.name}`)
            console.log(result.data)
            enqueueSnackbar(result.data.message, { variant: 'default' })
            localStorage.setItem('token', result.data.token);
            dispatch(setUpUser(jwt(result.data.token)))
        } catch (err) {
            enqueueSnackbar(err.response.data.message, { variant: 'default' })
        }
        setAddedToLibrary(false)
    }

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

                <NavLink exact to="/profile" className="header-nav-link"> <img src={`http://localhost:5000/${user.img}`} alt="" className="img__library" /> </NavLink>
            </Header>

            <AlbumHeader>
                {album !== null ?
                    <React.Fragment>
                        <img src={`http://localhost:5000/${album.photo}`} />
                        <div>
                            <h2> {album.name} </h2>
                            <span> {album.year} &#8226; {album.tracks.length} {album.tracks.length === 1 ? "song" : "songs"} </span>
                            <div>
                                <button onClick={handlePlay}> <FontAwesomeIcon icon={faPlay} /> PLAY </button>
                                {addedToLibrary ?
                                    <button onClick={handleDeleteFromLibrary}> REMOVE FROM LIBRARY <DeleteIcon /> </button>
                                    :
                                    <button onClick={handleAddToLibrary}> ADD TO LIBRARY <LibraryMusicIcon /> </button>
                                }
                            </div>
                        </div>
                    </React.Fragment>
                    : null}
            </AlbumHeader>

            <AlbumContainer>
                <h2> Songs </h2>
                {album !== null ?
                    album.tracks.map((track, index) => {
                        if (track === songId) return (<AlbumTrack key={index} albumId={id} id={track} handleLike={handleLike} songs={songs} handleUrl={handleUrl} hover={true} songState={songIdState} />)
                        else return (<AlbumTrack key={index} albumId={id} id={track} handleLike={handleLike} songs={songs} handleUrl={handleUrl} hover={false} songState={false} />)
                    })
                    : null}
            </AlbumContainer>

        </React.Fragment>
    );
    return content;
}


const AlbumQP = ({ id, songId, handleLike, songs, handleUrl, songIdState }) => {

    useEffect(() => {

    }, [id])

    let content = (
        <SnackbarProvider maxSnack={1} preventDuplicate>
            <Global />
            <AlbumQPNotification id={id} songId={songId} handleLike={handleLike} songs={songs} handleUrl={handleUrl} songIdState={songIdState} />
        </SnackbarProvider>
    );
    return content;
}

export default AlbumQP;