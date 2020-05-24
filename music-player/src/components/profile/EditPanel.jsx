import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { Global, Header, LeftHeader, RightHeader, Footer, FooterLeftSide, FooterRightSide, Main, Tdiv, Fdiv } from '../../assets/styles/profile';
import { Sdiv, Ftdiv } from '../../assets/styles/editpanel';
import '../../assets/css/Global.css';
import w_wave from '../../assets/images/white_wave.png';
import flag from '../../assets/images/romania-flag.png';

const ArtistPanel = () => {

    /* User stuff */
    const history = useHistory();
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
                    <h1> Edit panel </h1>
                </Tdiv>

                <Ftdiv>
                    
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