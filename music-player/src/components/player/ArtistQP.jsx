import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import Axios from 'axios';

/* COMPONENTS */
import Album from './Album';

/* REDUX */
import { setUpUser } from '../../actions/index';
import { useSelector, useDispatch } from 'react-redux';
import jwt from 'jwt-decode'

/* ICONS & IMAGES */
import { faSearch, faHeart, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import wavy from '../../assets/images/white_wave.png';

/* SNACK BAR */
import { SnackbarProvider, useSnackbar } from 'notistack';

/* STYLING */
import '../../assets/css/Global.css';
import { PlaylistContainer } from '../../assets/styles/playlistSong';
import { Global, ArtistHeader, AlbumsContainer } from '../../assets/styles/artists';
import { Header, Links } from '../../assets/styles/webplayer';
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

const ArtistSingle = ({ artistId, id, handleLike, songs, handleUrl, hover, songState }) => {

    const [songInfo, setSongInfo] = useState('');
    const [playing, setPlaying] = useState(false)
    const [like, setLike] = useState(false)
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
        }

        setPlaying(songState)
    }, [songs, playing, id, songState])

    useEffect(() => {
        return () => {
            setLike(false)
        }
    }, [songs])

    const toggleLike = () => {
        setLike(!like)
        handleLike(!like, songInfo.path)
    }

    const togglePlay = () => {
        setPlaying(!playing)
        handleUrl(songInfo.path, !playing, id)
        localStorage.setItem('artist_singles', artistId)
        localStorage.setItem('playlist', null);
        localStorage.setItem('album', null);
    }

    const triggerModal = () => {
        setShowUpModal(true)
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
            {hover ?
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
                </HoveredSongDiv>
                :
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
                </SongDiv>}

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

        </React.Fragment>
    );
    return content;
}


const ArtistQPNotification = ({ id, songId, handleLike, songs, handleUrl, songIdState }) => {

    const [artist, setArtist] = useState(null)
    const [following, setFollowing] = useState(false);
    const [singles, setSingles] = useState(null)
    const [albums, setAlbums] = useState(null);
    const user = useSelector(state => state.user)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    useEffect(() => {
        Axios.get(`http://localhost:5000/artist/${id}`)
            .then(res => {
                setAlbums(res.data.artist.albums);
                setArtist(res.data.artist);
                setSingles(res.data.artist.singles);
            })
            .catch(err => console.log(err))

        if (user.artists !== undefined) {
            let i;
            for (i = 0; i < user.artists.length; i++) {
                if (user.artists[i] === id) setFollowing(true)
            }
        }

    }, [following])

    const handlePlay = () => {
        Axios.post('http://localhost:5000/song/', { song: singles[0] })
            .then(res => {
                handleUrl(res.data.info.path, true, singles[0]);
            })
            .catch(err => console.log(err))

        localStorage.setItem('artist_singles', id)
        localStorage.setItem('playlist', null);
        localStorage.setItem('album', null);
    }

    const handleFollow = async () => {
        if (!following) {
            await Axios.patch(`http://localhost:5000/artist/follow/${id}/${user.id}`)
                .then((res) => {
                    enqueueSnackbar(res.data.message, { variant: 'default' })
                    dispatch(setUpUser(jwt(res.data.token)));
                    localStorage.setItem('token', res.data.token)
                })
                .catch(err => console.log(err))

            await Axios.post('http://localhost:5001/artist/follow', { userId: user.id, artistId: id })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {
            await Axios.patch(`http://localhost:5000/artist/unfollow/${id}/${user.id}`)
                .then((res) => {
                    enqueueSnackbar(res.data.message, { variant: 'default' })
                    dispatch(setUpUser(jwt(res.data.token)));
                    localStorage.setItem('token', res.data.token)
                })
                .catch(err => console.log(err))

            await Axios.post('http://localhost:5001/artist/unfollow', { userId: user.id, artistId: id })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        setFollowing(!following)
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

            <ArtistHeader>
                {artist !== null ?
                    <React.Fragment>
                        <img src={`http://localhost:5000/${artist.photo}`} />
                        <div>
                            <h1> {artist.name} </h1>
                            <span> {artist.followers} {artist.followers !== 1 ? "followers" : "follower"} </span>
                            <div>
                                <button onClick={handlePlay} > Play <FontAwesomeIcon icon={faPlay} /> </button>
                                <button onClick={handleFollow}> {following ? <React.Fragment> Unfollow <FontAwesomeIcon icon={faHeart} /> </React.Fragment> :
                                    <React.Fragment> Follow <FontAwesomeIcon icon={faHeart} /> </React.Fragment>} </button>
                            </div>
                        </div>
                    </React.Fragment>
                    : null
                }
            </ArtistHeader>

            {singles !== null && singles.length > 0 ?
                <PlaylistContainer>
                    <h2> Songs </h2>
                    {singles !== null ?
                        singles.map((single, index) => {
                            if (single === songId) return (<ArtistSingle key={index} artistId={id} id={single} handleLike={handleLike} songs={songs} handleUrl={handleUrl} hover={true} songState={songIdState} />)
                            else return (<ArtistSingle key={index} artistId={id} id={single} handleLike={handleLike} songs={songs} handleUrl={handleUrl} hover={false} songState={false} />)
                        })
                        : null}
                </PlaylistContainer>
                : null}

            <AlbumsContainer>
                <h2> Albums </h2>
                <div>
                    {albums !== null ?
                        albums.map((album, index) => {
                            return (<Album key={index} id={album}> {album} </Album>)
                        })
                        : null}
                </div>
            </AlbumsContainer>

        </React.Fragment>

    );
    return content;
}

const ArtistQP = ({ id, songId, handleLike, songs, handleUrl, songIdState }) => {
    useEffect(() => {

    }, [id])

    let content = (
        <SnackbarProvider maxSnack={1} preventDuplicate>
            <ArtistQPNotification id={id} songId={songId} handleLike={handleLike} songs={songs} handleUrl={handleUrl} songIdState={songIdState} />
        </SnackbarProvider>
    );
    return content;
}

export default ArtistQP;