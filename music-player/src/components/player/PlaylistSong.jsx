import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HoveredPlaylistItem, PlaylistItem } from '../../assets/styles/playlistSong';
import '../../assets/css/Global.css';
import Axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { useSnackbar } from 'notistack';
import Modal from 'react-modal';


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

const PlaylistSong = ({ handleDeleteTrack, playlistId, id, songs, handleLike, handleUrl, hover, songState }) => {
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
    }, [id, playing, songState, songs, playlistId])

    useEffect(() => {
        return () => {
            setLike(false)
        }
    }, [songs])

    const togglePlay = () => {
        setPlaying(!playing);
        handleUrl(songInfo.path, !playing, id);
        localStorage.setItem('playlist', playlistId);
        localStorage.setItem('artist_singles', null);
        localStorage.setItem('album', null);
    }

    const toggleLike = () => {
        setLike(!like)
        handleLike(!like, songInfo.path)
    }

    const triggerDeleteTrack = () => {
        handleDeleteTrack(id)
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
                <HoveredPlaylistItem>
                    <div>
                        <button onClick={togglePlay}>
                            {songInfo.photo_path ? <img src={`http://localhost:5000/${songInfo.photo_path}`} alt="" /> : null}
                        </button>
                        {playing ? <FontAwesomeIcon onClick={togglePlay} style={{cursor: "pointer"}} icon={faPause} /> : <FontAwesomeIcon onClick={togglePlay} style={{cursor: "pointer"}} icon={faPlay} />}
                    </div>
                    <span> {songInfo.title} </span>
                    <span> {songInfo.artist} </span>
                    <span> {songInfo.album} </span>
                    <button onClick={toggleLike}> {like ? <FavoriteIcon style={{ color: "white" }} /> : <FavoriteBorderIcon style={{ color: "#c7c7c7" }} />} </button>
                    <button onClick={triggerDeleteTrack}> <RemoveCircleIcon style={{ color: "white" }} /> </button>
                    <button onClick={triggerModal}> <PlaylistAddIcon style={{ color: "white" }} /> </button>
                    <span> {songInfo.duration} </span>
                </HoveredPlaylistItem> :
                <PlaylistItem>
                    <div>
                        <button onClick={togglePlay}>
                            {songInfo.photo_path ? <img src={`http://localhost:5000/${songInfo.photo_path}`} alt="" /> : null}
                        </button>
                        {playing ? <FontAwesomeIcon onClick={togglePlay} style={{cursor: "pointer"}} icon={faPause} /> : <FontAwesomeIcon onClick={togglePlay} style={{cursor: "pointer"}} icon={faPlay} />}
                    </div>
                    <span> {songInfo.title} </span>
                    <span> {songInfo.artist} </span>
                    <span> {songInfo.album} </span>
                    <button onClick={toggleLike}> {like ? <FavoriteIcon style={{ color: "white" }} /> : <FavoriteBorderIcon style={{ color: "#c7c7c7" }} />} </button>
                    <button onClick={triggerDeleteTrack}> <RemoveCircleIcon style={{ color: "white" }} /> </button>
                    <button onClick={triggerModal}> <PlaylistAddIcon style={{ color: "white" }} /> </button>
                    <span> {songInfo.duration} </span>
                </PlaylistItem>}

            {showUpModal ? <Modal
                isOpen={showUpModal}
                onRequestClose={() => setShowUpModal(false)}
                className="playlist-modal"
                overlayClassName="overlay">

                <div>
                    <h3> Add to playlist </h3>
                    <div>
                        {playlists.length > 1 ? playlists.map((playlist, index) => {
                            if (playlist !== playlistId) return <ModalItem key={index} playlistId={playlist} handleAddToPlaylist={handleAddToPlaylist}> {playlist} </ModalItem>
                        }): <p> No playlist found. 😥</p>}
                    </div>
                </div>

            </Modal> : null}

        </React.Fragment>

    );
    return content;
}

export default PlaylistSong;