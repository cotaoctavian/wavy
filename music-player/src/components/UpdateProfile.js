import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { Global, Header, LeftHeader, RightHeader, Footer, FooterLeftSide, FooterRightSide, Main, Tdiv, Fdiv } from '../assets/styles/profile';
import { Sdiv, Ftdiv } from '../assets/styles/updateprofile';
import { setUpUser } from '../actions/index';
import jwt from 'jwt-decode'
import '../assets/css/Global.css';
import w_wave from '../assets/images/white_wave.png';
import flag from '../assets/images/romania-flag.png';


const UpdateProfile = props => {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [currentUsername, setCurrentUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [uploadMessage, setUploadMessage] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('')
    const [uploadedFile, setUploadedFile] = useState({})
    const [photoPath, setPhotoPath] = useState(user.img)

    useEffect(() => {
        document.body.classList.remove('dashboard-back');
        setCurrentUsername(user.username)
    }, [user.username])

    const logout = () => {
        localStorage.removeItem('logged');
        history.push('/')
    }

    const onSubmitEmail = async (e) => {
        e.preventDefault()
        const data = {
            email: user.email,
            new_email: email,
            password: password
        }

        try { 
            const res = await Axios.post('http://localhost:5000/profile/update_email', data)
            setMessage(res.data.message)
        } catch (err) {
            console.log(err)
        }

    }

    const updateImage = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await Axios.post("http://localhost:5000/upload/" + user.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { token, fileName, filePath } = res.data;
            setUploadMessage(res.data.message);
            setUploadedFile({ fileName, filePath });
            setPhotoPath(filePath)
            localStorage.setItem('token', token);
            dispatch(setUpUser(jwt(token)))
        } catch (err) {
            console.log(err)
        }
    }

    const updatePhoto = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const onSubmitUsername = async (e) => {
        e.preventDefault()

        if (username.length < 6) {
            setUsernameMessage("The username is too short. Minimum 6 characters.")
        } else {

            const data = {
                id: user.id,
                username: username
            }

            try {
                const res = await Axios.post("http://localhost:5000/profile/update_username", data)

                setUsernameMessage(res.data.message)
                setCurrentUsername(username)
                setUsername('')
                setMessage('')
                localStorage.setItem('token', res.data.token);
                dispatch(setUpUser(jwt(res.data.token)))

            } catch (err) {
                if (err) {
                    if (err.response.status === 400) {
                        console.log('There was a problem with the server');
                    } else {
                        console.log(err.response.data.msg);
                    }
                }
            }
        }

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
                </Sdiv>

                <Tdiv>
                    <h1> Update profile </h1>
                </Tdiv>

                <Ftdiv>
                    <div>
                        <div>
                            <h2> Change avatar </h2>
                            <img src={"http://localhost:5000/" + photoPath} alt="" />
                            <form onSubmit={updateImage}>
                                <input
                                    type="file"
                                    required
                                    onChange={updatePhoto}
                                />
                                <button> Upload </button>
                                {uploadMessage.length > 0 ? <span> {uploadMessage} </span> : null}
                            </form>
                        </div>

                        <div>
                            <form onSubmit={onSubmitEmail}>
                                <h2> Change email </h2>
                                <input
                                    type="text"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <button> Update </button>
                                {message.length > 0 ? <span> {message} </span> : <span> {message} </span>}
                            </form>

                            <form onSubmit={onSubmitUsername}>
                                <h2> Change username </h2>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                                <button> Update </button>
                                {usernameMessage.length > 0 ? <span> {usernameMessage} </span> : null}
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

export default UpdateProfile;