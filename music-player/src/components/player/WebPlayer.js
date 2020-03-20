import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUpUser } from '../../actions/index';
import '../../assets/css/Global.css';
import Library from './Library';
import LikedSongs from './LikedSongs';
import Player from './Player';
import HomePlayer from './HomePlayer';
import Axios from 'axios';
import jwt from 'jwt-decode';

const WebPlayer = props => {

    const [user, setUser] = useState(useSelector(state => state.user))
    const [url, setUrl] = useState('')
    const [songInfo, setSongInfo] = useState(null)
    const [audio] = useState(new Audio())
    const [playing, setPlaying] = useState(false)
    const [like, setLike] = useState(true)
    const urlPathname = window.location.pathname
    const dispatch = useDispatch();

    const handleUrl = (songUrl, playing) => {
        setUrl(songUrl)
        setPlaying(playing)

        Axios.post(`http://localhost:5000/song/info`, { name: songUrl })
            .then(res => {
                setSongInfo(res.data.info)
            })
            .catch(err => console.log(err))
    }

    const handleLike = (like, songUrl) => {
        setLike(like)
        if (like === false) {
            Axios.post("http://localhost:5000/song/dislike", { name: songUrl, id: user.id })
                .then(res => {
                    dispatch(setUpUser(jwt(res.data.token)))
                    setUser(jwt(res.data.token))
                    localStorage.setItem('token', res.data.token);
                })
                .catch(err => console.log(err))
        } else if(like === true) {
            Axios.post("http://localhost:5000/song/like", {name: songUrl, id: user.id})
                .then(res => {
                    dispatch(setUpUser(jwt(res.data.token)))
                    setUser(jwt(res.data.token))
                    localStorage.setItem('token', res.data.token)
                })
        }
    }

    useEffect(() => {
    }, [url, playing, user, like])

    let content = (
        <React.Fragment>
            {urlPathname === "/player" ? <HomePlayer handle={handleUrl} /> : null}
            {urlPathname === "/library" ? <Library handle={handleUrl} /> : null}
            {urlPathname === "/library/tracks" ? <LikedSongs songs={user.songs} url={url} play={playing} handle={handleUrl} handleLike={handleLike} /> : null}
            {url.length > 0 ? <Player handleLike={handleLike} songInfo={songInfo} audio={audio} url={url} play={playing} changePlay={setPlaying} likeState={like} /> : null}
        </React.Fragment>
    );
    return content;
}


export default WebPlayer