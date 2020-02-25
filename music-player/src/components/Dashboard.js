import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { NavLink, useHistory} from 'react-router-dom';
import '../assets/css/Dashboard.css';
import "../assets/css/Global.css";
import w_wave from '../assets/images/white_wave.png';
import jcole from '../assets/images/jcole.png';
import album2 from '../assets/images/album_2.jpg';
import eminem from '../assets/images/eminem.jpg';
import kendrick from '../assets/images/kendrick.jpg';
import flag from '../assets/images/romania-flag.png';
import deliric from '../assets/images/deliric.jpg';
import nane from '../assets/images/nane.jpg';


const Dashboard = props => {

    const history = useHistory()
    const userData = useSelector(state => state.user)
    const [username, setUsername] = useState('')
    const photoPath = userData.img

    useEffect(() => {
        document.body.classList.add('dashboard-back')
        document.body.classList.remove('home-back')
        document.body.classList.remove('header')
        document.body.classList.remove('right-div')
        setUsername(userData.username)
    }, [userData.username])

    const logout = () => {
        localStorage.removeItem('loggedIn');
        history.push('/')
    }

    let content = (
        <div>
            <header>
                <div className="left-div">
                    <img src={w_wave} alt="" />
                    <p> <NavLink exact to ="/dashboard" className="header-nav-link">  wavy. </NavLink> </p>
                </div>
                <span> | </span>
                <div className="header-right-div">
                    <img src={'http://localhost:5000/' + photoPath} alt = "" />
                    <p> <NavLink exact to="/profile" className="log-in-navlink"> {username} </NavLink> </p>
                    <p> <NavLink exact to="/" onClick={() => logout()} className="log-in-navlink"> Log Out </NavLink> </p>
                </div>
            </header>

            <main className="main-content">
                <span> Looking for wavy music? </span>
                <p> Ride the best music releases.</p>
                <NavLink exact to="/player" className="web-player-button"> GET WAVY </NavLink>
                <div className="music-grid-container">
                    <img src={jcole} alt=""/>
                    <img src={eminem} alt=""/>
                    <img src={kendrick} alt=""/>
                    <img src={album2} alt=""/>
                    <img src={deliric} alt=""/>
                    <img src={nane} alt=""/>
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