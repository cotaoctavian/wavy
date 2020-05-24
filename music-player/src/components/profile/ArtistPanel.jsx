import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { Global, Header, LeftHeader, RightHeader, Footer, FooterLeftSide, FooterRightSide, Main, Tdiv, Fdiv } from '../../assets/styles/profile';
import { Sdiv, Ftdiv } from '../../assets/styles/artistpanel';
import { setUpUser } from '../../actions/index';
import jwt from 'jwt-decode'
import '../../assets/css/Global.css';
import w_wave from '../../assets/images/white_wave.png';
import flag from '../../assets/images/romania-flag.png';

const ArtistPanel = () => {

    /* User stuff */
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [currentUsername, setCurrentUsername] = useState('');
    const [photoPath] = useState(user.img);

    /* Form responses */
    const [uploadMessageAlbum, setUploadMessageAlbum] = useState('');
    const [uploadMessageSong, setUploadMessageSong] = useState('');

    /* Album states */
    const [file, setFile] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [year, setYear] = useState('');

    /* Song states */
    const [songTitle, setSongTitle] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [genre, setGenre] = useState('');
    const [songFile, setSongFile] = useState('');
    const [songPhoto, setSongPhoto] = useState('');

    useEffect(() => {
        document.body.classList.remove('dashboard-back');
        setCurrentUsername(user.username)
    }, [user.username])

    const logout = () => {
        localStorage.setItem('token', null);
        history.push('/')
    }

    const uploadAlbum = async (event) => {
        event.preventDefault()

        const formData = new FormData();
        formData.append('file', file);


        try {
            const result = await Axios.post(`http://localhost:5000/album/1/${user.username}/${albumTitle}/${year}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setUploadMessageAlbum(result.data.message);
            setAlbumName('');
            setYear('');
            setFile('');
        }
        catch (err) {
            console.log(err)
        }

    }

    const formatSecondsAsTime = (secs) => {
        var hr = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hr * 3600)) / 60);
        var sec = Math.floor(secs - (hr * 3600) - (min * 60));

        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }

        return min + ':' + sec;
    }

    const uploadSong = async (event) => {
        event.preventDefault();

        let objectURL = URL.createObjectURL(songFile);
        const audio = new Audio();
        audio.src = objectURL;
        audio.addEventListener('loadedmetadata', async (e) => {
            let duration = formatSecondsAsTime(Math.floor(e.target.duration).toString());
            let formData = new FormData();

            formData.append('photo', songPhoto);
            formData.append('song', songFile);

            try {
                const result = await Axios.post(`http://localhost:5000/song/${songTitle}/${user.username}/${albumName}/${genre}/${duration}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data'}
                })
    
                setUploadMessageSong(result.data.message);
            } catch (err) {
                console.log(err)
            }
        });

        setSongTitle('');
        setAlbumName('');
        setGenre('');
        setSongFile('');
        setSongPhoto('');
    }

    const updatePhoto = (e) => {
        setFile(e.target.files[0])
    }

    let content = (
        <React.Fragment>
            <Global />
            <Header>
                <LeftHeader>
                    <img src={w_wave} alt="" />
                    <p> <NavLink exact to="/dashboard" className="header-nav-link">  wavy. </NavLink> </p>
                </LeftHeader>

                <span> | </span>

                <RightHeader>
                    <img src={'http://localhost:5000/' + photoPath} alt="" />
                    <p> <NavLink exact to="/profile" className="log-in-navlink"> {currentUsername} </NavLink> </p>
                    <p> <NavLink exact to="/" onClick={() => logout()} className="log-in-navlink"> Log Out </NavLink> </p>
                </RightHeader>
            </Header>

            <Main>
                <Fdiv>
                    <img src={'http://localhost:5000/' + photoPath} alt="" />
                </Fdiv>

                <Sdiv>
                    <span> <NavLink exact to="/profile" className="profile-nav-link"> Account overview </NavLink></span>
                    <span> <NavLink exact to="/change_password" className="profile-nav-link"> Change password </NavLink> </span>
                    <span> <NavLink exact to="/update_profile" className="profile-nav-link"> Update profile </NavLink></span>
                    {user.is_artist === true ? <span> <NavLink exact to="/artist_panel" className="profile-nav-link"> Artist panel </NavLink></span> : null}
                    {user.is_artist === true ? <span> <NavLink exact to="/edit_panel" className="profile-nav-link"> Edit panel </NavLink></span> : null}
                </Sdiv>

                <Tdiv>
                    <h1> Artist panel </h1>
                </Tdiv>

                <Ftdiv>
                    <div>
                        <div>
                            <form onSubmit={uploadAlbum}>
                                <h2> Create album </h2>
                                <label> Name of the album </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter the name of the album"
                                    onChange={(e) => setAlbumTitle(e.target.value)}
                                />


                                <label> Year of the album </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter the year of the album"
                                    onChange={(e) => setYear(e.target.value)}
                                />

                                <label> Artwork of the album </label>
                                <input
                                    type="file"
                                    required
                                    onChange={updatePhoto}
                                />

                                <button> Upload album </button>
                                {uploadMessageAlbum.length > 0 ? <span> {uploadMessageAlbum} </span> : null}
                            </form>
                        </div>

                        <div>
                            <form onSubmit={uploadSong}>
                                <h2> Add song to album </h2>
                                <label> Name of the song </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter the name of the song"
                                    onChange={(e) => setSongTitle(e.target.value)}
                                />


                                <label> Name of the album </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter the name of the album"
                                    onChange={(e) => setAlbumName(e.target.value)}
                                />

                                <label> Genre </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter the genre of the song"
                                    onChange={(e) => setGenre(e.target.value)}
                                />

                                <label> Artwork of the song </label>
                                <input
                                    type="file"
                                    required
                                    onChange={(e) => setSongPhoto(e.target.files[0])}
                                />

                                <label> Song file </label>
                                <input
                                    type="file"
                                    required
                                    onChange={(e) => setSongFile(e.target.files[0])}
                                />

                                <button> Upload song </button>
                                {uploadMessageSong.length > 0 ? <span> {uploadMessageSong} </span> : null}
                            </form>
                        </div>
                    </div>

                </Ftdiv>

            </Main>


            <Footer>
                <FooterLeftSide>
                    <img src={w_wave} alt="" />
                    <span> wavy. </span>
                </FooterLeftSide>

                <FooterRightSide>
                    <span> Romania </span>
                    <img src={flag} alt="" />
                    <span> © 2020 wavy. </span>
                </FooterRightSide>
            </Footer>


        </React.Fragment>
    );

    return content;
}

export default ArtistPanel;