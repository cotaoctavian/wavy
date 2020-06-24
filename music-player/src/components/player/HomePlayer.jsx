import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

/* Components */
import ArtistItem from './ArtistItem'

/* Images and icons */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import wavy from '../../assets/images/white_wave.png';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import rec from '../../assets/images/rec.svg';

/* Styling */
import { Header, Global, Links } from '../../assets/styles/webplayer';
import { RecommendedSongs, SongContainer, RecommendedAlbumsContainer, RecommendedArtistsContainer, LoadingContainer, NothingFoundContainer } from '../../assets/styles/homeplayer';
import '../../assets/css/Global.css';
import '../../assets/css/Spinner.scss';


const AlbumItem = ({ id }) => {

    const [albumData, setAlbumData] = useState(null)

    useEffect(() => {
        Axios.get(`http://localhost:5000/album/${id}`)
            .then(res => {
                setAlbumData(res.data.album)
            })
            .catch(err => console.log(err))
    }, [])

    let content = (
        <div>
            {albumData !== null ?
                <React.Fragment>
                    <NavLink exact to={`/library/album/${id}`} className="squared-nav-link"> <img src={`http://localhost:5000/${albumData.photo}`} /> </NavLink>
                    <span> {albumData.name} </span>
                </React.Fragment>
                :
                null}
        </div>
    );
    return content;
}


const SongItem = ({ id, handleUrl, songState }) => {
    const [song, setSong] = useState('')
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        Axios.post("http://localhost:5000/song", { song: id })
            .then(res => {
                setSong(res.data.info)
            })
            .catch(err => console.log(err))

        setPlaying(songState)
    }, [id, songState, playing])


    const togglePlay = () => {
        handleUrl(song.path, !playing, id)
        localStorage.setItem('playlist', null)
        localStorage.setItem('artist_singles', null)
        localStorage.setItem('album', null);
        setPlaying(!playing)
    }

    let content = (
        <SongContainer>
            <div>
                {song.photo_path ? <img src={`http://localhost:5000/${song.photo_path}`} alt="" /> : null}
                <div>
                    <span> {song.title} </span>
                </div>
                {playing ?
                    <button onClick={togglePlay}> <PauseCircleFilledIcon style={{ color: "white", fontSize: 50 }} /> </button>
                    :
                    <button onClick={togglePlay}> <PlayCircleFilledIcon style={{ color: "white", fontSize: 50 }} /> </button>}
            </div>
        </SongContainer>
    );
    return content;
}


const HomePlayer = ({ id, image, handleUrl, songId, songIdState }) => {

    const [recommendedSongs, setRecommendedSongs] = useState([])
    const [recommendedAlbums, setRecommendedAlbums] = useState([])
    const [recommendedArtists, setRecommendedArtists] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (id !== undefined) {

            Axios.post("http://localhost:5001/recommended/songs/genres", { userId: id })
                .then(async (response) => {
                    let genres = response.data.result[0]
                    let tracks = []
                    for (let i = 0; i < genres.length; i++) {
                        await Axios.post("http://localhost:5001/recommended/tracks", { userId: id, genre: genres[i], limit: parseInt(Math.ceil(8 / genres.length)) })
                            .then((response) => {
                                const songs = response.data.result
                                for (let j = 0; j < songs.length; j++)
                                    tracks.push(songs[j])
                            })
                            .catch((err) => console.log(err))
                    }
                    setRecommendedSongs(tracks)

                    Axios.post("http://localhost:5001/recommended/albums/genres", { userId: id })
                        .then(async (response) => {
                            let genres = response.data.result[0]
                            let albums = []
                            for (let i = 0; i < genres.length; i++) {
                                await Axios.post("http://localhost:5001/recommended/albums", { userId: id, genre: genres[i], limit: 2 })
                                    .then((response) => {
                                        const albums_data = response.data.result
                                        for (let j = 0; j < albums_data.length; j++)
                                            albums.push(albums_data[j])
                                    })
                                    .catch((err) => console.log(err))
                            }
                            setRecommendedAlbums(albums)

                            Axios.post("http://localhost:5001/recommended/artists/genres", { userId: id })
                                .then(async (response) => {
                                    let genres = response.data.result[0]
                                    let artists = []
                                    for (let i = 0; i < genres.length; i++) {
                                        await Axios.post("http://localhost:5001/recommended/artists", { userId: id, genre: genres[i], limit: 2 })
                                            .then((response) => {
                                                const artists_data = response.data.result
                                                for (let j = 0; j < artists_data.length; j++)
                                                    artists.push(artists_data[j])
                                            })
                                            .catch((err) => console.log(err))
                                    }
                                    setRecommendedArtists(artists)

                                    Axios.post("http://localhost:5001/recommended/token", { songs: tracks, albums: albums, artists: artists })
                                        .then((response) => {
                                            localStorage.setItem('recommended_token', response.data.token)
                                        })
                                        .catch((err) => console.log(err))

                                    setInterval(() => {
                                        setLoading(true)
                                    }, 1500)
                                })
                                .catch((error) => console.log(error))

                        })
                        .catch((error) => console.log(error))
                })
                .catch((error) => console.log(error))
        }
    }, [id])

    let content = (
        <React.Fragment>
            <Global />
            <Header>
                <div>
                    <img src={wavy} alt="" />
                    <span> <NavLink exact to="/player" className="header-nav-link">  wavy. </NavLink> </span>
                </div>

                <Links>
                    <span> <NavLink exact to="/player" className="header-nav-link"> Home </NavLink> </span>
                    <span> <NavLink exact to="/hotlist" className="header-player-link"> Hotlist </NavLink></span>
                    <span> <NavLink exact to="/library/playlists" className="header-player-link"> Library </NavLink></span>
                    <span> <NavLink exact to="/search" className="header-player-link"> <FontAwesomeIcon icon={faSearch} /> Search </NavLink> </span>
                </Links>

                <NavLink exact to="/profile" className="header-nav-link"> <img src={`http://localhost:5000/${image}`} alt="" className="img__library" /> </NavLink>

            </Header>

            {loading ? null :
                <LoadingContainer>
                    <div>
                        <div className="spinner slices"></div>
                    </div>
                </LoadingContainer>}

            {recommendedSongs.length === 0 && recommendedAlbums.length === 0 && recommendedArtists.length === 0 && loading ?
                <NothingFoundContainer>
                    <h1> Appreciate some music to get your recommendations! </h1>
                    <img src={rec} alt="" />
                </NothingFoundContainer>
                :
                null}

            {loading ?
                <RecommendedSongs>
                    {recommendedSongs.length > 0 ? <h1> Recommended songs for you </h1> : null}
                    <div>
                        {recommendedSongs.length > 0 ?
                            recommendedSongs.map((song, index) => {
                                if (song === songId) return <SongItem key={index} id={song} handleUrl={handleUrl} songState={songIdState} />
                                else return <SongItem key={index} id={song} handleUrl={handleUrl} songState={false} />
                            })
                            : null}
                    </div>
                </RecommendedSongs> : null}

            {loading ?
                <RecommendedAlbumsContainer>

                    {recommendedAlbums.length !== 0 ? <h1> Recommended albums for you </h1> : null}

                    <div>
                        {recommendedAlbums.length !== 0 ?
                            recommendedAlbums.map((album, index) => {
                                return (<AlbumItem key={index} id={album}> {album} </AlbumItem>)
                            })
                            : null}
                    </div>
                </RecommendedAlbumsContainer> : null}


            {loading ?
                <RecommendedArtistsContainer>

                    {recommendedArtists.length !== 0 ? <h1> Recommended artists for you </h1> : null}

                    <div>
                        {recommendedArtists.map((artist, index) => {
                            return (<ArtistItem key={index} id={artist} />)
                        })}
                    </div>
                </RecommendedArtistsContainer> : null}
        </React.Fragment >
    );
    return content;
}


export default HomePlayer