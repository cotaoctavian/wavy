import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { useHistory, NavLink } from 'react-router-dom';
import { Global, Header, LeftHeader, RightHeader, Footer, FooterLeftSide, FooterRightSide, Main, Tdiv, Fdiv } from '../../assets/styles/profile';
import { Sdiv, Ftdiv} from '../../assets/styles/changepassword';
import w_wave from '../../assets/images/white_wave.png';
import flag from '../../assets/images/romania-flag.png';
import '../../assets/css/Global.css';

const ChangePassword = props => {

    const history = useHistory();
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [username, setUsername] = useState('')
    const [photoPath, setPhotoPath] = useState('')
    const user = useSelector(state => state.user)

    useEffect(() => {
        document.body.classList.remove('dashboard-back');
        setUsername(user.username)
        setPhotoPath(user.img)
    }, [user.username, user.img])

    const logout = () => {
        localStorage.removeItem('logged');
        history.push('/')
    }

    const onSubmit = e => {
        e.preventDefault()
        const userData = {
            id: user.id,
            password: password,
            new_password: newPassword
        }

        if (newPassword !== password) {
            if (newPassword.length < 8) {
                setMessage("Your new password needs to be at least 8 characters long.")
                setStatus("ERR")
            } else {
                if (newPassword !== confirmNewPassword) {
                    setMessage("Your new password and confirm new password do not match.")
                    setStatus("ERR")
                } else {
                    Axios.post("http://localhost:5000/resetpass/profile", userData)
                        .then(res => {
                            setMessage(res.data.message)
                            setStatus(res.data.status)
                        })
                        .catch(err => {
                            console.log(err)
                        })

                    setPassword('')
                    setNewPassword('')
                    setConfirmNewPassword('')
                }
            }
        } else {
            setMessage("Your new password cannot be the same as the old one.")
            setStatus("ERR")
        }
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
                    <img src={'http://localhost:5000/' + photoPath} alt="" />
                    <p> <NavLink exact to="/profile" className="log-in-navlink"> {username} </NavLink> </p>
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
                </Sdiv>

                <Tdiv>
                    <h1> Change password </h1>
                </Tdiv>

                <Ftdiv>
                    <div>
                        <form onSubmit={onSubmit}>
                            <span> Current password </span>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <span> New password </span>
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />

                            <span> Confirm new password </span>
                            <input
                                type="password"
                                required
                                value={confirmNewPassword}
                                onChange={e => setConfirmNewPassword(e.target.value)}
                            />

                            <hr />
                            <div>
                                <button> CONFIRM </button>
                                <NavLink exact to="/profile" className="change-pass-nav"> CANCEL </NavLink>
                            </div>
                            {status === "OK"? <span style={{color: "#00c26b"}}> {message} </span> : <span style={{color: "#ff4a4a"}}> {message} </span>}
                        </form>
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

export default ChangePassword;