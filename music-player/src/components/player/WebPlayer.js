import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUpUser } from '../../actions/index';
import '../../assets/css/Global.css';
import Library from './Library';
import LikedSongs from './LikedSongs';
import Player from './Player';
import HomePlayer from './HomePlayer';
import Playlist from './Playlist';
import Axios from 'axios';
import jwt from 'jwt-decode';

const WebPlayer = (props) => {

    const [user, setUser] = useState(useSelector(state => state.user))
    const [songId, setSongId] = useState(null)
    const [url, setUrl] = useState('')
    const [songInfo, setSongInfo] = useState(null)
    const [audio] = useState(new Audio())
    const [playing, setPlaying] = useState(false)
    const [like, setLike] = useState(true)
    const [reset, setReset] = useState(true)
    const urlPathname = window.location.pathname
    const dispatch = useDispatch();

    const handleUrl = async (songUrl, playing, currentSongId) => {
        setUrl(songUrl)
        setPlaying(playing)
        if (songId !== currentSongId) setSongId(currentSongId)

        await Axios.post(`http://localhost:5000/song/info`, { name: songUrl })
            .then(res => {
                setSongInfo(res.data.info)
            })
            .catch(err => console.log(err))
    }

    const handleLike = async (like, songUrl) => {
        setLike(like)
        if (like === false) {
            await Axios.post("http://localhost:5000/song/dislike", { name: songUrl, id: user.id })
                .then(res => {
                    dispatch(setUpUser(jwt(res.data.token)))
                    localStorage.setItem('token', res.data.token);
                    setUser(jwt(res.data.token))
                })
                .catch(err => console.log(err))
        } else if (like === true) {
            await Axios.post("http://localhost:5000/song/like", { name: songUrl, id: user.id })
                .then(res => {
                    dispatch(setUpUser(jwt(res.data.token)))
                    localStorage.setItem('token', res.data.token)
                    setUser(jwt(res.data.token))
                })
        }
    }

    const handlePrevious = async (repeatMode) => {
        let i, position;
        for (i = 0; i < user.songs.length; i++) {
            if (user.songs[i] === songId) {
                position = i;
                break;
            }
        }

        if (position === 0) {
            if (repeatMode === 0) {
                setSongId(user.songs[0]);
                setReset(!reset);
            } else if (repeatMode === 2) {
                setSongId(user.songs[0]);
                setReset(!reset);
            }
        }
        else {
            if (repeatMode === 2) {
                setSongId(user.songs[position]);
                setReset(!reset);
            } else {
                setSongId(user.songs[position - 1]);
                await Axios.post("http://localhost:5000/song", { song: user.songs[position - 1] })
                    .then(async res => {
                        setUrl(res.data.info.path)
                        await Axios.post(`http://localhost:5000/song/info`, { name: res.data.info.path })
                            .then(res => {
                                setSongInfo(res.data.info)
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            }
        }
    }

    const handleForward = async (repeatMode) => {

        let i, position;
        for (i = 0; i < user.songs.length; i++) {
            if (user.songs[i] === songId) {
                position = i;
                break;
            }
        }

        if (position === (user.songs.length - 1)) {
            if (repeatMode === 0) {
                setPlaying(false);
                setReset(!reset);
            } else {
                setSongId(user.songs[0]);
                await Axios.post("http://localhost:5000/song", { song: user.songs[0] })
                    .then(res => {
                        setUrl(res.data.info.path)
                        Axios.post(`http://localhost:5000/song/info`, { name: res.data.info.path })
                            .then(res => {
                                setSongInfo(res.data.info)
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            }
        } else {
            setSongId(user.songs[position + 1]);
            await Axios.post("http://localhost:5000/song", { song: user.songs[position + 1] })
                .then(res => {
                    setUrl(res.data.info.path)
                    Axios.post(`http://localhost:5000/song/info`, { name: res.data.info.path })
                        .then(res => {
                            setSongInfo(res.data.info)
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
    }, [url, playing, user, like, songId, user])

    let content = (
        <React.Fragment>
            {urlPathname === "/player" ? <HomePlayer handle={handleUrl} /> : null}
            {urlPathname === "/library" ? <Library handle={handleUrl} /> : null}    
            {urlPathname === "/library/playlists" ? <Playlist image={user.img} userId={user.id} /> : null}
            {urlPathname === "/library/tracks" ? <LikedSongs image={user.img} songs={user.songs} songId={songId} songIdState={playing} handle={handleUrl} handleLike={handleLike} /> : null}
            {url.length > 0 ? <Player resetTrack={reset} handlePrevious={handlePrevious} handleForward={handleForward} handleLike={handleLike} songInfo={songInfo} audio={audio} url={url} play={playing} changePlay={setPlaying} likeState={like} /> : null}
        </React.Fragment>
    );
    return content;
}


export default WebPlayer;