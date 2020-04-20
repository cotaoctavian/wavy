import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { Global, Header, LeftHeader, RightHeader, Footer, FooterLeftSide, FooterRightSide, Main, Sdiv, Tdiv, Fdiv, Ftdiv } from '../../assets/styles/profile';
import w_wave from '../../assets/images/white_wave.png';
import flag from '../../assets/images/romania-flag.png';
import '../../assets/css/Global.css';

const Profile = props => {

    const history = useHistory();
    const user = useSelector(state => state.user)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        document.body.classList.remove('dashboard-back');
        setUsername(user.username)
        setEmail(user.email)
    }, [user.username, user.email])

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
                    <p> <NavLink exact to ="/dashboard" className="header-nav-link">  wavy. </NavLink> </p>
                </LeftHeader>

                <span> | </span>

                <RightHeader>
                    <img src={'http://localhost:5000/' + user.img} alt="" />
                    <p> <NavLink exact to="/profile" className="log-in-navlink"> {username} </NavLink> </p>
                    <p> <NavLink exact to="/" onClick={() => logout()} className="log-in-navlink"> Log Out </NavLink> </p>
                </RightHeader>
            </Header>

            <Main>
                <Fdiv> 
                    <img src={'http://localhost:5000/' + user.img} alt="" />
                </Fdiv>

                <Sdiv> 
                    <span> <NavLink exact to = "/profile" className="profile-nav-link"> Account overview </NavLink></span>
                    <span> <NavLink exact to = "/change_password" className="profile-nav-link"> Change password </NavLink> </span>
                    <span> <NavLink exact to = "/update_profile" className="profile-nav-link"> Update profile </NavLink></span>
                </Sdiv>

                <Tdiv> 
                    <h1> Account overview </h1>
                </Tdiv>

                <Ftdiv>
                    <div> 
                        <h2> Profile </h2>
                        <div>
                            <span> Username </span>
                            <span> {username} </span>
                        </div>
                        <div>
                            <span> Email </span>
                            <span> {email} </span>
                        </div>

                        <NavLink exact to="/update_profile" className="profile-nav-container"> Edit profile </NavLink>
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

export default Profile;