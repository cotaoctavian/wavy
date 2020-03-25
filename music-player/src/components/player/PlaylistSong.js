import React, { useEffect, useState } from 'react';
import { PlaylistItem } from '../../assets/styles/playlistSong';
import Axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';

const PlaylistSong = ({ id, songs }) => {
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
    }, [id])

    const handleClick = () => {
        console.log("test")
    }

    let content = (
        <React.Fragment>
            <PlaylistItem>
                <div>
                    <button onClick={handleClick}>
                        {songInfo.photo_path ? <img src={`http://localhost:5000/${songInfo.photo_path}`} alt="" /> : null}
                    </button>
                    {playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                </div>
                <span> {songInfo.title} </span>
                <span> {songInfo.artist} </span>
                <span> {songInfo.album} </span>
                <button onClick={handleClick}> {like ? <FavoriteIcon style={{ color: "white" }} /> : <FavoriteBorderIcon style={{ color: "#c7c7c7" }} />} </button>
                <span> {songInfo.duration} </span>
            </PlaylistItem>
        </React.Fragment>

    );
    return content;
}

export default PlaylistSong;