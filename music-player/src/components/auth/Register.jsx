import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import photo from "../../assets/images/signup.svg";
import "../../assets/css/Register.css";
import Axios from "axios";
import * as EmailValidator from "email-validator";


const Register = () => {
    const history = useHistory()
    const [usernameCheck, setUsernameCheck] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailCheck, setEmailCheck] = useState(false)
    const [passwordCheck, setPasswordCheck] = useState(false)
    const [confirmPasswordCheck, setConfirmPasswordCheck] = useState(false)
    const [message, setMessage] = useState('')

    //Mount
    useEffect(() => {
        document.body.classList.add('register-back');
        document.body.classList.remove('dashboard-back')
        if (username.length > 5) setUsernameCheck(true);
        if (EmailValidator.validate(email)) setEmailCheck(true);
        if (password.length > 7) setPasswordCheck(true);
        if (confirmPassword === password && confirmPassword.length > 0 && password.length > 0) setConfirmPasswordCheck(true);
    }, [username, email, confirmPassword, password])

    //Unmount
    useEffect(() => {
        return () => {
            document.body.classList.remove('register-back');
            document.body.classList.remove('dashboard-back')
        }
    }, [])

    if (localStorage.getItem('token') !== "null" && localStorage.getItem('token') !== null) {
        history.push('/dashboard');
    }

    const onChangeUsername = event => {
        setUsername(event.target.value)
    }

    const onChangeEmail = event => {
        setEmail(event.target.value)
    }

    const onChangePassword = event => {
        setPassword(event.target.value)
    }

    const onChangeConfirmedPassword = event => {
        setConfirmPassword(event.target.value)
    }

    const onSubmit = event => {
        event.preventDefault()

        if (usernameCheck && emailCheck && passwordCheck && confirmPasswordCheck) {

            const registration = {
                username: username,
                email: email,
                password: password,
                img: 'images/user_avatar.svg'
            };

            Axios.post('http://localhost:5000/register/', registration)
                .then(res => {
                    setMessage(res.data)

                    Axios.post('http://localhost:5001/auth', {username: res.data.username, id: res.data.userId})
                        .then((res) => {
                            console.log(res.data.message)
                        })
                        .catch((err) => console.log(err))

                    if (res.data.message === "Registration added!") history.push('/login');
                    
                })
                .catch(err => console.log(err));


            setUsername('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setPasswordCheck(false)
            setUsernameCheck(false)
            setPasswordCheck(false)
            setEmailCheck(false)
            setConfirmPasswordCheck(false)
        }
    }

    let content = (
        <div className="register-container">
            <form onSubmit={onSubmit.bind(this)}>
                <h1 className="register-cell1"> Join us! </h1>
                <input className="register-cell2"
                    type="text"
                    required
                    value={username}
                    onChange={onChangeUsername.bind(this)}
                    placeholder="&#xf007; Username"
                />
                {username.length < 6 && username.length > 0 ? <span className="register-cell10">The username is too short.</span> : null}
                <input className="register-cell3"
                    type="text"
                    required
                    value={email}
                    onChange={onChangeEmail.bind(this)}
                    placeholder="&#xf0e0; Email"
                />
                {!EmailValidator.validate(email) && email.length > 0 ? <span className="register-cell11"> The email address you supplied is invalid. </span> : null}
                <input className="register-cell4"
                    type="password"
                    required
                    value={password}
                    onChange={onChangePassword.bind(this)}
                    placeholder="&#xf023; Password"
                />
                {password.length < 8 && password.length > 0 ? <span className="register-cell8"> The password is too short. </span> : null}
                <input className="register-cell5"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={onChangeConfirmedPassword.bind(this)}
                    placeholder="&#xf023; Confirm password"
                />
                {confirmPassword !== password ? <span className="register-cell9"> The passwords don't match. </span> : null}
                <button className="register-cell6" > Create account </button>
                <NavLink className="register-cell7" exact to="/login"> Sign in instead &#187; </NavLink>
                <span className="register-cell12"> {message === "Username or email already exists!" ? message : null} </span>
            </form>
            <img src={photo} alt=" " />
        </div>
    );

    return content;
};

export default Register;