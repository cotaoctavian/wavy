import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import '../assets/css/Dashboard.css';
import "../assets/css/Global.css";
import w_wave from '../assets/images/white_wave.png';
import flag from '../assets/images/romania-flag.png';
import { SongContainer } from '../assets/styles/dashboard';


const SongItem = ({ songData, audio }) => {
    const [song, setSong] = useState(undefined);
    const [artist, setArtist] = useState(undefined);
    var timeout;

    useEffect(() => {
        Axios.post("http://localhost:5000/song", { song: songData[0]["id"] })
            .then(res => {
                setSong(res.data.info)
                Axios.post("http://localhost:5000/song/artist", { songId: songData[0]["id"] })
                    .then((result) => {
                        setArtist(result.data.message[0]["artistId"]);
                    })
                    .catch((err) => console.log(err))
            })
            .catch(err => console.log(err))
    }, [songData])

    const togglePlay = (event) => {
        event.preventDefault();
        audio.src = `http://localhost:5000/${song.path}`;
        setTimeout(() => {
            audio.play();
        }, 150);

        timeout = setTimeout(() => {
            audio.pause();
            audio.src = "";
        }, 10000);
    }

    const toggleStop = (event) => {
        event.preventDefault();
        audio.pause();
        audio.src = "";

        clearTimeout(timeout);
    }

    let content = (
        <React.Fragment>
            {song !== undefined ?
                <SongContainer >
                    <NavLink onMouseEnter={toggleStop} to={`/library/artists/${artist}`}>
                        <img onMouseEnter={togglePlay} onMouseOut={toggleStop} src={`http://localhost:5000/${song.photo_path}`} alt="" />
                        <div>
                            <span> {song.artist} </span>
                            <span> {song.title} </span>
                        </div>
                    </NavLink>
                </SongContainer>
                :
                null}
        </React.Fragment>
    )
    return content;
}


const Dashboard = () => {

    const history = useHistory()
    const userData = useSelector(state => state.user)
    const [username, setUsername] = useState('')
    const [recommendedSongs, setRecommendedSongs] = useState([])
    const photoPath = userData.img
    const [audio] = useState(new Audio());

    useEffect(() => {
        document.body.classList.add('dashboard-back')
        document.body.classList.remove('home-back')
        document.body.classList.remove('header')
        document.body.classList.remove('right-div')
        setUsername(userData.username)

        Axios.post("http://localhost:5001/recommended/songs/genres", { userId: userData.id })
            .then(async (response) => {
                let genres = response.data.result[0]

                if (genres.length > 0) {
                    let albums = []

                    for (let i = 0; i < genres.length; i++) {
                        await Axios.post("http://localhost:5001/recommended/genres/albums", { userId: userData.id, genre: genres[i], limit: parseInt(Math.ceil(6 / genres.length)) })
                            .then((response) => {
                                const album = response.data.result
                                for (let j = 0; j < album.length; j++)
                                    albums.push(album[j])
                            })
                            .catch((err) => console.log(err))
                    }

                    /* Shuffle albums so every artist can have a change to be on dashboard */
                    let shuffledAlbums = albums
                        .map((a) => ({ sort: Math.random(), value: a }))
                        .sort((a, b) => a.sort - b.sort)
                        .map((a) => a.value)
                    let songs = []
                    for (let i = 0; i < 6; i++) {
                        await Axios.post("http://localhost:5001/recommended/albums/songs", { userId: userData.id, album: shuffledAlbums[i], limit: 1 })
                            .then((response) => {
                                songs.push(response.data.result)
                            })
                            .catch(err => console.log(err))
                    }
                    setRecommendedSongs(songs);
                } else {
                    /* If the user doesn't have the recommendations already set. */
                    await Axios.post("http://localhost:5001/recommended/random/tracks", { userId: userData.id })
                        .then(async (response) => {
                            let songs = [];
                            for (let i = 0; i < response.data.result.length; i++) {
                                await Axios.post("http://localhost:5001/recommended/albums/songs", { userId: userData.id, album: response.data.result[i].album, limit: 1 })
                                    .then((response) => {
                                        songs.push(response.data.result)
                                    })
                                    .catch(err => console.log(err))
                            }
                            setRecommendedSongs(songs);
                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err))

    }, [userData.username])

    const logout = () => {
        localStorage.setItem('token', null);
        history.push('/')
    }

    let content = (
        <div>
            <header>
                <div className="left-div">
                    <img src={w_wave} alt="" />
                    <p> <NavLink exact to="/dashboard" className="header-nav-link">  wavy. </NavLink> </p>
                </div>
                <span> | </span>
                <div className="header-right-div">
                    <img src={'http://localhost:5000/' + photoPath} alt="" />
                    <p> <NavLink exact to="/profile" className="log-in-navlink"> {username} </NavLink> </p>
                    <p> <NavLink exact to="/" onClick={() => logout()} className="log-in-navlink"> Log Out </NavLink> </p>
                </div>
            </header>

            <main className="main-content">
                <span> Looking for wavy music? </span>
                <p> Ride the best music releases.</p>
                <NavLink exact to="/player" className="web-player-button"> GET WAVY </NavLink>
                <div className="music-grid-container">
                    {recommendedSongs.length > 0 ? recommendedSongs.map((song, index) => {
                        if (index < 6) return (<SongItem key={index} songData={song} audio={audio} />)
                    }) : null}
                </div>
            </main>

            <footer>
                <div className="footer-left-side">
                    <img src={w_wave} alt="" />
                    <span> wavy. </span>
                </div>

                <div className="footer-right-side">
                    <span> Romania </span>
                    <img src={flag} alt="" />
                    <span> © 2020 wavy. </span>
                </div>
            </footer>
        </div>
    );

    return content;
}

export default Dashboard;