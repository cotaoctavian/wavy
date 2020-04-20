import React, { useState, useEffect, } from 'react';
import photo from '../../assets/images/img-01.png'
import '../../assets/css/Login.css';
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import jwt from 'jwt-decode'
import { setUpUser } from '../../actions/index';


const Login = () => {
    // const [username, setUsername] = useState('');
    const history = useHistory()
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Mount
    useEffect(() => {
        document.body.classList.add('login-back');
        document.body.classList.remove('dashboard-back')
    }, [email])

    //Unmount
    useEffect(() => {
        return () => {
            document.body.classList.remove('login-back')
            document.body.classList.remove('dashboard-back')
        }
    }, [])

    const onSubmit = event => {
        event.preventDefault()

        const login = {
            email: email,
            password: password
        }

        Axios.post('http://localhost:5000/login/', login)
            .then(res => {
                if (res.data.message) setMessage(res.data.message);
                else {
                    const result = res.data.token;
                    localStorage.setItem('token', result);
                    dispatch(setUpUser(jwt(result)))
                    history.push("/dashboard")
                }
            })
            .catch(err => console.log(err));

        setEmail('')
        setPassword('')

    }

    let content = (
        <div className="login-container">
            <img src={photo} alt="" />
            <form onSubmit={onSubmit}>
                <h1 className="cell1"> Join our world! </h1>

                {message.length > 0 ? <span className="cell7"> {message} </span> : null}

                <input className="cell2"
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="&#xf0e0; Email" />

                <input className="cell3"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="&#xf023; Password" />

                <button className="cell4"> LOGIN </button>


                <p className="cell5"> Forgot <NavLink exact to="/reset" className="forgot"> Username/Password? </NavLink></p>
                <NavLink exact to='/register' className="cell6"> Create your account &#8620; </NavLink>
            </form>
        </div>
    )

    return content;
};

export default Login;