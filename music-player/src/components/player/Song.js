import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { SongDiv, HoveredSongDiv } from '../../assets/styles/song';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { useSnackbar } from 'notistack';
import Modal from 'react-modal';
import '../../assets/css/Global.css';

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

const Song = props => {
    const [song, setSong] = useState('')
    const [playing, setPlaying] = useState(false)
    const [like, setLike] = useState(true)
    const [songId] = useState(props.data)
    const [showUpModal, setShowUpModal] = useState(false)
    const playlists = useSelector(state => state.user.playlists)
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        Axios.post("http://localhost:5000/song", { song: props.data })
            .then(res => {
                setSong(res.data.info)
            })
            .catch(err => console.log(err))

        setPlaying(props.playing)
    }, [props.data, props.playing, playing])

    const togglePlay = () => {
        props.handle(song.path, !playing, songId)
        localStorage.setItem('playlist', 'liked_songs')
        setPlaying(!playing)
    }

    const toggleLike = () => {
        setLike(!like)
        props.handleLike(!like, song.path)
    }

    const triggerModal = () => {
        setShowUpModal(true)
    }
    
    const handleAddToPlaylist = async (playlistId) => {
        setShowUpModal(false)
        try {
            const response = await Axios.post("http://localhost:5000/playlist/track", { playlistId: playlistId, trackId: props.data })
            enqueueSnackbar(response.data.message, { variant: 'default' })
        } catch (err) {

        }
    }

    let content = (
        <div>
            {!props.hover ?
                <SongDiv>
                    <div>
                        <button onClick={togglePlay}>
                            {song.photo_path ? <img src={`http://localhost:5000/${song.photo_path}`} alt="" /> : null}
                        </button>
                        {playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                    </div>
                    <span> {song.title} </span>
                    <span> {song.artist} </span>
                    <span> {song.album} </span>
                    <button onClick={toggleLike}> {like ? <FavoriteIcon style={{ color: "white" }} /> : <FavoriteBorderIcon style={{ color: "#c7c7c7" }} />} </button>
                    <button onClick={triggerModal}> <PlaylistAddIcon style={{ color: "white" }} /> </button>
                    <span> {song.duration} </span>

                </SongDiv> :
                <HoveredSongDiv>
                    <div>
                        <button onClick={togglePlay}>
                            {song.photo_path ? <img src={`http://localhost:5000/${song.photo_path}`} alt="" /> : null}
                        </button>
                        {playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                    </div>
                    <span> {song.title} </span>
                    <span> {song.artist} </span>
                    <span> {song.album} </span>
                    <button onClick={toggleLike}> {like ? <FavoriteIcon style={{ color: "white" }} /> : <FavoriteBorderIcon style={{ color: "#c7c7c7" }} />} </button>
                    <button onClick={triggerModal}> <PlaylistAddIcon style={{ color: "white" }} /> </button>
                    <span> {song.duration} </span>
                </HoveredSongDiv>}

                {showUpModal ? <Modal
                isOpen={showUpModal}
                onRequestClose={() => setShowUpModal(false)}
                className="song-modal"
                overlayClassName="overlay">

                <div>
                    <h3> Add to playlist </h3>
                    <div>
                        {playlists.map((playlist, index) => {
                            return <ModalItem key={index} playlistId={playlist} handleAddToPlaylist={handleAddToPlaylist}> {playlist} </ModalItem>
                        })}
                    </div>
                </div>

            </Modal> : null}

        </div>

    );
    return content;
}

export default Song;