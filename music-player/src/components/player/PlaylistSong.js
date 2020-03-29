import React, { useEffect, useState } from 'react';
import { HoveredPlaylistItem, PlaylistItem } from '../../assets/styles/playlistSong';
import Axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const PlaylistSong = ({ handleDeleteTrack, playlistId, id, songs, handleLike, handleUrl, hover, songState }) => {
    const [songInfo, setSongInfo] = useState('');
    const [playing, setPlaying] = useState(false)
    const [like, setLike] = useState(false)

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
        setPlaying(!playing)
        handleUrl(songInfo.path, !playing, id)
        localStorage.setItem('playlist', playlistId)
    }

    const toggleLike = () => {
        setLike(!like)
        handleLike(!like, songInfo.path)
    }

    const triggerDeleteTrack = () => {
        handleDeleteTrack(id)
    }

    const onClick = () => {}

    let content = (
        <React.Fragment>
            {hover ?
                <HoveredPlaylistItem>
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
                    <button onClick={triggerDeleteTrack}> <RemoveCircleIcon style={{ color: "white" }}/> </button>
                    <button onClick={onClick}> <PlaylistAddIcon style={{ color: "white" }}/> </button>
                    <span> {songInfo.duration} </span>
                </HoveredPlaylistItem> :
                <PlaylistItem>
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
                    <button onClick={triggerDeleteTrack}> <RemoveCircleIcon style={{ color: "white" }}/> </button>
                    <button onClick={onClick}> <PlaylistAddIcon style={{ color: "white" }}/> </button>
                    <span> {songInfo.duration} </span>
                </PlaylistItem>}
        </React.Fragment>

    );
    return content;
}

export default PlaylistSong;