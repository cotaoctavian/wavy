import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router';
import '../assets/css/Home.css';
import '../assets/css/Global.css';
import { NavLink } from 'react-router-dom'
import w_wave from '../assets/images/white_wave.png';
import flag from '../assets/images/romania-flag.png';

const Home = ({ history }) => {

    useEffect(() => {
        document.body.classList.add('home-back')
        document.body.classList.remove('dashboard-back')
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('home-back')
            document.body.classList.remove('dashboard-back')
        }
    }, []);

    if (localStorage.getItem('token') !== "null" && localStorage.getItem('token') !== null) {
        history.push('/dashboard');
    }

    let content = (
        <div className="full-page">
            <header className="navbar">
                <div className="left-div">
                    <img src={w_wave} alt="" />
                    <p> <NavLink exact to="/" className="header-nav-link">  wavy. </NavLink> </p>
                </div>
                <span> | </span>
                <div className="right-div">
                    <p> <NavLink exact to="/register" className="log-in-navlink"> Sign up </NavLink> </p>
                    <p> <NavLink exact to="/login" className="log-in-navlink"> Log In </NavLink> </p>
                </div>
            </header>

            <div className="center-content">
                <span> Let's get <span className="wavy-text"> wavy </span> together! </span> <br />
                <p> Music for everyone. Everywhere. </p>
                <NavLink exact to="/register" className="center-navlink"> Get wavy now! </NavLink>
            </div>

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

export default withRouter(Home); 