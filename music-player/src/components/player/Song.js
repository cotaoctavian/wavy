import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { SongDiv, HoveredSongDiv } from '../../assets/styles/song';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';

const Song = props => {
    const [song, setSong] = useState('')
    const [playing, setPlaying] = useState(false)
    const [like, setLike] = useState(true)
    const [songId] = useState(props.data)

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
                    <span> {song.duration} </span>
                </HoveredSongDiv>}

        </div>

    );
    return content;
}

export default Song;