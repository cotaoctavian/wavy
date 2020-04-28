import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Axios from 'axios';
import Modal from 'react-modal';
import { SnackbarProvider, useSnackbar } from 'notistack';

/* STYLING */
import { Header, Global, Links } from '../../assets/styles/webplayer';
import { SearchBar, TopResult, SearchContainer, TopResultWithSongs, SearchSong, AlbumsList, ArtistsList, HoveredSearchSong, SearchBarMessage, NoResultsFound, TopResultSong } from '../../assets/styles/search';
import '../../assets/css/Global.css';

/* IMAGES AND ICONS */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import wavy from '../../assets/images/white_wave.png';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import search from '../../../src/assets/images/search.svg'
import notfound from '../../../src/assets/images/not_found.svg'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

/* COMPONENTS */
import Album from './Album';
import ArtistItem from './ArtistItem';


const ModalItem = ({ playlistId, handleAddToPlaylist }) => {

    const [title, setTitle] = useState('')

    useEffect(() => {
        Axios.get(`http://localhost:5000/playlist/${playlistId}`)
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

const SearchTrack = ({ id, handleUrl, songState, hover }) => {
    const [song, setSong] = useState('');
    const [playing, setPlaying] = useState(false)
    const [showUpModal, setShowUpModal] = useState(false)
    const playlists = useSelector(state => state.user.playlists)
    const { enqueueSnackbar } = useSnackbar();

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
        setPlaying(!playing)
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
        <div>
            {hover ?
                <HoveredSearchSong>
                    <div>
                        <button onClick={togglePlay}>
                            {song.photo_path ? <img src={`http://localhost:5000/${song.photo_path}`} alt="" /> : null}
                        </button>
                        {playing ? <FontAwesomeIcon onClick={togglePlay} style={{cursor: "pointer"}} icon={faPause} /> : <FontAwesomeIcon onClick={togglePlay} style={{cursor: "pointer"}} icon={faPlay} />}
                    </div>
                    <span> {song.title} </span>
                    <span> {song.artist} </span>

                    <button onClick={triggerModal}> <PlaylistAddIcon style={{ color: "white" }} /> </button>
                </HoveredSearchSong>
                :
                <SearchSong>
                    <div>
                        <button onClick={togglePlay}>
                            {song.photo_path ? <img src={`http://localhost:5000/${song.photo_path}`} alt="" /> : null}
                        </button>
                        {playing ? <FontAwesomeIcon onClick={togglePlay} style={{cursor: "pointer"}} icon={faPause} /> : <FontAwesomeIcon onClick={togglePlay} style={{cursor: "pointer"}} icon={faPlay} />}
                    </div>
                    <span> {song.title} </span>
                    <span> {song.artist} </span>

                    <button onClick={triggerModal}> <PlaylistAddIcon style={{ color: "white" }} /> </button>
                </SearchSong>
            }


            {showUpModal ? <Modal
                isOpen={showUpModal}
                onRequestClose={() => setShowUpModal(false)}
                className="search-modal"
                overlayClassName="overlay">

                <div>
                    <h3> Add to playlist </h3>
                    <div>
                        {playlists.length > 0 ? playlists.map((playlist, index) => {
                            return <ModalItem key={index} playlistId={playlist} handleAddToPlaylist={handleAddToPlaylist}> {playlist} </ModalItem>
                        }) : (<p> No playlist found. 😥</p>)}
                    </div>
                </div>

            </Modal> : null}
        </div>
    );
    return content;
}


const Search = ({ songId, songIdState, handleUrl }) => {

    const user = useSelector(state => state.user)
    const [songsList, setSongsList] = useState(null)
    const [artistsList, setArtistsList] = useState(null)
    const [albumsList, setAlbumsList] = useState(null)
    const [filteredArtists, setFilteredArtists] = useState(null)
    const [filteredSongs, setFilteredSongs] = useState(null)
    const [filteredAlbums, setFilteredAlbums] = useState(null)
    const [topResult, setTopResult] = useState(null)
    const [searchMessage, setSearchMessage] = useState(null)
    const [introMessage, setIntroMessage] = useState(null)
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        Axios.get('http://localhost:5000/song')
            .then((res) => {
                setSongsList(res.data.songs)
                setArtistsList(res.data.artists)
                setAlbumsList(res.data.albums)
            })
            .catch(error => console.log(error))
        if (filteredSongs !== null) {
            if (filteredSongs[0]._id === songId) setPlaying(songIdState)
            else setPlaying(false)
        }
    }, [topResult, filteredSongs, filteredAlbums, filteredArtists, songIdState, songId, handleUrl])

    const handleOnChange = (e) => {
        e.preventDefault()

        let currentList = []
        let trackList = []
        let albumList = []
        let artistList = []

        if (e.target.value !== "" && /^[a-zA-Z0-9\s]+$/.test(e.target.value)) {

            currentList = songsList

            /* Search tracks */
            trackList = currentList.filter(item => {

                /* Items from songsList */
                let trackTitle = item.title.toLowerCase()

                trackTitle = trackTitle.replace(/\s+/g, '');
                trackTitle = trackTitle.replace(/\./g, '');

                /* Value from search bar */
                let searchBarValueWithoutSpaces = e.target.value.toLowerCase()

                searchBarValueWithoutSpaces = searchBarValueWithoutSpaces.replace(".", '')
                searchBarValueWithoutSpaces = searchBarValueWithoutSpaces.replace(/\s+/g, '');

                let searchBarValueSplited = e.target.value.toLowerCase()

                searchBarValueSplited = searchBarValueSplited.split(" ");

                for (let i = 0; i < searchBarValueSplited.length; i++)
                    if (trackTitle.includes(searchBarValueSplited[i]) && searchBarValueSplited[i] !== "-") return trackTitle

                if (trackTitle.includes(searchBarValueWithoutSpaces)) return trackTitle
            })

            currentList = artistsList

            artistList = currentList.filter(item => {
                let artistName = item.name.toLowerCase()

                artistName = artistName.replace(/\s+/g, '');
                artistName = artistName.replace(/\./g, '');

                let searchBarValueWithoutSpaces = e.target.value.toLowerCase()

                searchBarValueWithoutSpaces = searchBarValueWithoutSpaces.replace(".", '')
                searchBarValueWithoutSpaces = searchBarValueWithoutSpaces.replace(/\s+/g, '');

                let searchBarValueSplited = e.target.value.toLowerCase()

                searchBarValueSplited = searchBarValueSplited.split(" ");

                for (let i = 0; i < searchBarValueSplited.length; i++)
                    if (artistName.includes(searchBarValueSplited[i]) && searchBarValueSplited[i] !== "-") return artistName

                if (artistName.includes(searchBarValueWithoutSpaces)) return artistName
            })

            currentList = albumsList
            albumList = currentList.filter(item => {
                let albumName = item.name.toLowerCase()

                albumName = albumName.replace(/\s+/g, '');
                albumName = albumName.replace(/\./g, '');

                /* Value from search bar */
                let searchBarValueWithoutSpaces = e.target.value.toLowerCase()

                searchBarValueWithoutSpaces = searchBarValueWithoutSpaces.replace(".", '')
                searchBarValueWithoutSpaces = searchBarValueWithoutSpaces.replace(/\s+/g, '');

                let searchBarValueSplited = e.target.value.toLowerCase()

                searchBarValueSplited = searchBarValueSplited.split(" ");

                for (let i = 0; i < searchBarValueSplited.length; i++)
                    if (albumName.includes(searchBarValueSplited[i]) && searchBarValueSplited[i] !== "-") return albumName

                if (albumName.includes(searchBarValueWithoutSpaces)) return albumName
            })
        }

        if (trackList.length > 0) {
            setFilteredSongs(trackList)
            setTopResult(0)
        }
        else setFilteredSongs(null)

        if (albumList.length > 0) {
            setFilteredAlbums(albumList);
            setTopResult(1);
        }
        else setFilteredAlbums(null)

        if (artistList.length > 0) {
            setFilteredArtists(artistList)
            setTopResult(2)
        }
        else setFilteredArtists(null)

        if (albumList.length === 0 && artistList.length === 0 && trackList.length === 0) {
            setTopResult(null)
            setSearchMessage('No results found.')
            setIntroMessage('')
        } else {
            setSearchMessage(null)
            setIntroMessage('')
        }
    }

    const togglePlay = () => {
        handleUrl(filteredSongs[0].path, !playing, filteredSongs[0]._id)
        setPlaying(!playing)
    }

    let content = (
        <SnackbarProvider maxSnack={1} preventDuplicate>
            <React.Fragment>
                <Global />
                <Header>
                    <div>
                        <img src={wavy} alt="" />
                        <span> <NavLink exact to="/player" className="header-nav-link">  wavy. </NavLink> </span>
                    </div>

                    <Links>
                        <span> <NavLink exact to="/player" className="header-player-link"> Home </NavLink> </span>
                        <span> <NavLink exact to="/hotlist" className="header-player-link"> Hotlist </NavLink></span>
                        <span> <NavLink exact to="/library/playlists" className="header-player-link"> Library </NavLink></span>
                        <span> <NavLink exact to="/search" className="header-nav-link"> <FontAwesomeIcon icon={faSearch} /> Search </NavLink> </span>
                    </Links>

                    <NavLink exact to="/profile" className="header-nav-link"> <img src={`http://localhost:5000/${user.img}`} alt="" className="img__library" /> </NavLink>
                </Header>

                <SearchBar>
                    <input type="search" placeholder="Search" onChange={handleOnChange} />
                </SearchBar>

                {introMessage === null ?
                    <SearchBarMessage>

                        <div>
                            <img src={search} alt="" />
                            <h2> Search your favorite <span className="search-wavy-text"> wavy </span> songs, albums or artists! </h2>
                        </div>
                    </SearchBarMessage>
                    : null}

                {searchMessage !== null ?
                    <NoResultsFound>
                        <div>
                            <img src={notfound} alt="" />
                            <h2> <span className="search-wavy-text"> {searchMessage} </span> </h2>
                        </div>
                    </NoResultsFound>
                    : null}

                <SearchContainer>
                    <TopResultWithSongs>
                        <div>
                            {topResult !== null ? <h2> Top result </h2> : null}

                            {topResult === 0 ?
                                <TopResultSong>
                                    <img src={`http://localhost:5000/${filteredSongs[0].photo_path}`} alt="" />
                                    <span> {filteredSongs[0].title} </span>
                                    <div>
                                        <span> {filteredSongs[0].artist} &#x2022; Song </span>
                                        {playing ?
                                            <button onClick={togglePlay}> <PauseCircleFilledIcon style={{ color: "white", fontSize: 50 }} /> </button>
                                            :
                                            <button onClick={togglePlay}> <PlayCircleFilledIcon style={{ color: "white", fontSize: 50 }} /> </button>}
                                    </div>
                                </TopResultSong>
                                :
                                null}

                            {topResult === 1 ?
                                <TopResult>
                                    <NavLink exact to={`/library/album/${filteredAlbums[0]._id}`}>
                                        <img src={`http://localhost:5000/${filteredAlbums[0].photo}`} alt="" />
                                        <span> {filteredAlbums[0].name} </span>
                                        <div>
                                            <span> {filteredAlbums[0].artist} &#x2022; Album </span>

                                        </div>
                                    </NavLink>
                                </TopResult>
                                :
                                null}

                            {topResult === 2 ?
                                <TopResult>
                                    <NavLink exact to={`/library/artists/${filteredArtists[0]._id}`}>
                                        <img src={`http://localhost:5000/${filteredArtists[0].photo}`} alt="" />
                                        <span> {filteredArtists[0].name} </span>
                                        <div>
                                            <span> Artist </span>
                                        </div>
                                    </NavLink>
                                </TopResult>
                                :
                                null}
                        </div>

                        <div>
                            {topResult !== null ? <h2> Songs </h2> : null}
                            {filteredSongs !== null ? filteredSongs.map((song, index) => {
                                if (index < 3) {
                                    if (songId !== null) {
                                        if (song._id === songId) {
                                            return <SearchTrack key={index} id={song._id} handleUrl={handleUrl} songState={songIdState} hover={true} />
                                        } else return <SearchTrack key={index} id={song._id} handleUrl={handleUrl} songState={false} hover={false} />
                                    }
                                    else return <SearchTrack key={index} id={song._id} handleUrl={handleUrl} songState={false} hover={false} />
                                }
                            })
                                : null}
                        </div>

                    </TopResultWithSongs>

                    {filteredAlbums !== null ?
                        <AlbumsList>
                            {filteredAlbums !== null ? <h2> Albums </h2> : null}
                            <div>
                                {filteredAlbums !== null ? filteredAlbums.map((album, index) => {
                                    return <Album key={index} id={album._id} />
                                })
                                    : null}
                            </div>
                        </AlbumsList> : null}

                    {filteredArtists !== null ? <h2> Artists </h2> : null}
                    <ArtistsList>
                        {filteredArtists !== null ? filteredArtists.map((artist, index) => {
                            return <ArtistItem key={index} id={artist._id} />
                        })
                            : null}
                    </ArtistsList>

                </SearchContainer>

            </React.Fragment>
        </SnackbarProvider>
    );
    return content;
}

export default Search;