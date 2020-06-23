import React, { useEffect, useState } from 'react';
import Axios from 'axios';

/* STYLES */
import '../../assets/css/Global.css';

/* COMPONENTS */
import Artists from './Artists';
import LikedSongs from './LikedSongs';
import Player from './Player';
import HomePlayer from './HomePlayer';
import Playlist from './Playlist';
import PlaylistQP from './PlaylistQP';
import ArtistQP from './ArtistQP';
import AlbumQP from './AlbumQP';
import LibraryAlbum from './LibraryAlbum';
import Search from './Search';
import MadeForYou from './MadeForYou';
import Hotlist from './Hotlist';

/* REDUX */
import { useSelector, useDispatch } from 'react-redux';
import { setUpUser } from '../../actions/index';
import jwt from 'jwt-decode';

const WebPlayer = (props) => {
    const user = useSelector(state => state.user)
    const [songId, setSongId] = useState(null)
    const [url, setUrl] = useState('')
    const [songInfo, setSongInfo] = useState(null)
    const [audio] = useState(new Audio())
    const [playing, setPlaying] = useState(false)
    const [like, setLike] = useState(false)
    const [reset, setReset] = useState(true)
    const [artistId, setArtistId] = useState(null)
    const [albumId, setAlbumId] = useState(null)
    const urlPathname = window.location.pathname
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList.remove('dashboard-back')

    }, [url, playing, user, like, songId])


    // Handle audio url changes that triggers the player.
    const handleUrl = async (songUrl, playing, currentSongId) => {
        setUrl(songUrl)
        setPlaying(playing)
        setLike(getPlaylistLikeState(currentSongId));

        if (songId !== currentSongId) setSongId(currentSongId)

        await Axios.post(`http://localhost:5000/song/info`, { name: songUrl })
            .then(res => {
                setSongInfo(res.data.info)
                Axios.get(`http://localhost:5000/artist/name/${res.data.info.artist}`)
                    .then(response => {
                        setArtistId(response.data.artist._id)
                        if (res.data.info.album !== '-') {
                            Axios.get(`http://localhost:5000/album/${res.data.info.album}/${response.data.artist._id}`)
                                .then((res) => {
                                    setAlbumId(res.data.album._id)
                                })
                                .catch((err) => console.log(err))
                        } else setAlbumId(null);
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

        await Axios.post('http://localhost:5001/song/listened', { userId: user.id, songId: currentSongId })
            .then(() => {
            })
            .catch(err => console.log(err))
    }

    // Handle like functionality of tracks
    const handleLike = async (like, songUrl) => {
        setLike(like)
        if (like === false) {
            await Axios.post("http://localhost:5000/song/dislike", { name: songUrl, id: user.id })
                .then(async (res) => {
                    dispatch(setUpUser(jwt(res.data.token)))
                    localStorage.setItem('token', res.data.token);

                    await Axios.post('http://localhost:5001/song/disliked', { userId: user.id, songId: res.data.songId })
                        .then(res => {
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        } else if (like === true) {
            await Axios.post("http://localhost:5000/song/like", { name: songUrl, id: user.id })
                .then(async (res) => {
                    dispatch(setUpUser(jwt(res.data.token)))
                    localStorage.setItem('token', res.data.token)

                    await Axios.post('http://localhost:5001/song/liked', { userId: user.id, songId: res.data.songId })
                        .then(res => {
                        })
                        .catch(err => console.log(err))

                })
                .catch(err => console.log(err))
        }
    }

    /* Get the like state based on playlist id */
    const getPlaylistLikeState = (playlistId) => {
        const likedSongs = user.songs;
        let likeState = false, i;
        for (i = 0; i < likedSongs.length; i++) {
            if (likedSongs[i] === playlistId) likeState = true;
        }
        return likeState;
    }

    // handle previous button of the player
    const handlePrevious = async (repeatMode) => {

        let playlistIdentifier = localStorage.getItem('playlist');
        let artistSingleIdentifier = localStorage.getItem('artist_singles');
        let albumIdentifier = localStorage.getItem('album');
        let playlist, position;

        if (playlistIdentifier !== "null") {
            if (playlistIdentifier === "liked_songs") playlist = user.songs
            else {
                try {
                    const result = await Axios.get(`http://localhost:5000/playlist/${playlistIdentifier}`)
                    playlist = result.data.playlist.songs
                } catch (err) {
                    console.log(err)
                }
            }
        } else if (artistSingleIdentifier !== "null") {
            try {
                const result = await Axios.get(`http://localhost:5000/artist/${artistSingleIdentifier}`)
                playlist = result.data.artist.singles;
            } catch (err) {
                console.log(err)
            }
        } else if (albumIdentifier !== "null") {
            try {
                const result = await Axios.get(`http://localhost:5000/album/${albumIdentifier}`)
                playlist = result.data.album.tracks;
            } catch (err) {
                console.log(err)
            }
        }

        if (playlistIdentifier !== "null" || artistSingleIdentifier !== "null" || albumIdentifier !== "null") {
            let i;
            for (i = 0; i < playlist.length; i++) {
                if (playlist[i] === songId) {
                    position = i;
                    break;
                }
            }

            if (position === 0) {
                if (repeatMode === 0) {
                    setSongId(playlist[0]);
                    setReset(!reset);
                    setLike(getPlaylistLikeState(playlist[0]));
                } else if (repeatMode === 2) {
                    setSongId(playlist[0]);
                    setReset(!reset);
                    setLike(getPlaylistLikeState(playlist[0]));
                }
            }
            else {
                if (repeatMode === 2) {
                    setSongId(playlist[position]);
                    setReset(!reset);
                    setLike(getPlaylistLikeState(playlist[position]));
                } else {
                    setSongId(playlist[position - 1]);
                    await Axios.post("http://localhost:5000/song", { song: playlist[position - 1] })
                        .then(async res => {
                            setUrl(res.data.info.path)
                            await Axios.post(`http://localhost:5000/song/info`, { name: res.data.info.path })
                                .then(res => {
                                    setSongInfo(res.data.info)
                                    setLike(getPlaylistLikeState(playlist[position - 1]));
                                })
                                .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                }
            }
        }
    }

    // Handle forward button of the player
    const handleForward = async (repeatMode) => {

        let playlistIdentifier = localStorage.getItem('playlist');
        let artistSingleIdentifier = localStorage.getItem('artist_singles')
        let albumIdentifier = localStorage.getItem('album');
        let shuffle = localStorage.getItem('shuffle');

        let playlist, position;

        if (playlistIdentifier !== "null") {
            if (playlistIdentifier === "liked_songs") playlist = user.songs
            else {
                try {
                    const result = await Axios.post("http://localhost:5000/playlist/", { id: playlistIdentifier })
                    playlist = result.data.playlist.songs
                } catch (err) {
                    console.log(err)
                }
            }
        } else if (artistSingleIdentifier !== "null") {
            try {
                const result = await Axios.get(`http://localhost:5000/artist/${artistSingleIdentifier}`)
                playlist = result.data.artist.singles;
            } catch (err) {
                console.log(err)
            }
        } else if (albumIdentifier !== "null") {
            try {
                const result = await Axios.get(`http://localhost:5000/album/${albumIdentifier}`)
                playlist = result.data.album.tracks;
            } catch (err) {
                console.log(err);
            }
        }

        if (shuffle === "1") {
            position = Math.floor(Math.random() * (playlist.length - 1));
            setSongId(playlist[position]);
            await Axios.post("http://localhost:5000/song", { song: playlist[position] })
                .then(res => {
                    setUrl(res.data.info.path)
                    Axios.post(`http://localhost:5000/song/info`, { name: res.data.info.path })
                        .then(res => {
                            setSongInfo(res.data.info)
                            setLike(getPlaylistLikeState(playlist[position + 1]))
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
        else {
            if (playlistIdentifier !== "null" || artistSingleIdentifier !== "null" || albumIdentifier !== "null") {
                let i;
                for (i = 0; i < playlist.length; i++) {
                    if (playlist[i] === songId) {
                        position = i;
                        break;
                    }
                }

                if (position === (playlist.length - 1)) {
                    if (repeatMode === 0) {
                        setPlaying(false);
                        setReset(!reset);
                    } else {
                        setSongId(playlist[0]);
                        await Axios.post("http://localhost:5000/song", { song: playlist[0] })
                            .then(res => {
                                setUrl(res.data.info.path)
                                Axios.post(`http://localhost:5000/song/info`, { name: res.data.info.path })
                                    .then(res => {
                                        setSongInfo(res.data.info)
                                        setLike(getPlaylistLikeState(playlist[0]))
                                    })
                                    .catch(err => console.log(err))
                            })
                            .catch(err => console.log(err))
                    }
                } else {
                    setSongId(playlist[position + 1]);
                    await Axios.post("http://localhost:5000/song", { song: playlist[position + 1] })
                        .then(res => {
                            setUrl(res.data.info.path)
                            Axios.post(`http://localhost:5000/song/info`, { name: res.data.info.path })
                                .then(res => {
                                    setSongInfo(res.data.info)
                                    setLike(getPlaylistLikeState(playlist[position + 1]))
                                })
                                .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                }
            }
        }
    }

    let content = (
        <React.Fragment>
            {props.match.params.id !== undefined && props.match.path.includes('artists') ? <ArtistQP id={props.match.params.id} songId={songId} handleLike={handleLike} songs={user.songs} handleUrl={handleUrl} songIdState={playing} /> : null}
            {props.match.params.id !== undefined && props.match.path.includes('playlists') ? <PlaylistQP songId={songId} songs={user.songs} id={props.match.params.id} handleLike={handleLike} handleUrl={handleUrl} songIdState={playing} /> : null}
            {props.match.params.id !== undefined && props.match.path.includes('album') ? <AlbumQP id={props.match.params.id} songId={songId} handleLike={handleLike} songs={user.songs} handleUrl={handleUrl} songIdState={playing} /> : null}
            {urlPathname === "/player" ? <HomePlayer id={user.id} image={user.img} handleUrl={handleUrl} songId={songId} songIdState={playing} /> : null}
            {urlPathname === "/hotlist" ? <Hotlist handleUrl={handleUrl} songId={songId} songIdState={playing} /> : null}
            {urlPathname === "/library/albums" ? <LibraryAlbum image={user.img} /> : null}
            {urlPathname === "/library/artists" ? <Artists /> : null}
            {urlPathname === "/library/made-for-you" ? <MadeForYou id={user.id} image={user.img} /> : null}
            {urlPathname === "/library/playlists" ? <Playlist image={user.img} userId={user.id} /> : null}
            {urlPathname === "/library/tracks" ? <LikedSongs image={user.img} songs={user.songs} songId={songId} songIdState={playing} handle={handleUrl} handleLike={handleLike} /> : null}
            {urlPathname === "/search" ? <Search songId={songId} songIdState={playing} handleUrl={handleUrl} /> : null}
            {url.length > 0 ? <Player resetTrack={reset} handlePrevious={handlePrevious} handleForward={handleForward} handleLike={handleLike} songInfo={songInfo} audio={audio} url={url} play={playing} changePlay={setPlaying} likeState={like} artistId={artistId} albumId={albumId} /> : null}
        </React.Fragment>
    );
    return content;
}


export default WebPlayer;