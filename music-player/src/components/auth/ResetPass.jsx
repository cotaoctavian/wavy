import React, { useState, useEffect } from 'react';
import photo from "../../assets/images/resetpass.svg";
import "../../assets/css/ResetPass.css";
import Axios from "axios";

const ResetPass = props => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        document.body.classList.add('resetpass-back');
        document.body.classList.remove('dashboard-back')
    }, [])

    useEffect(() => {
        return () => {
            document.body.classList.remove('resetpass-back')
            document.body.classList.remove('dashboard-back')
        }
    }, [])

    const onSubmit = event => {
        event.preventDefault()
        const userData = {
            _id: userId,
            password: password
        }

        if (password.length < 8) {
            setMessage("Your password needs to be at least 8 characters long")
        } else {
            if (password !== confirmPassword) {
                setMessage("Your password doesn't match.")
            } else {
                Axios.post("http://localhost:5000/resetpass/", userData)
                    .then(res => {
                        setMessage(res.data)
                    })
                    .catch(err => console.log(err));

                setUserId('')
                setPassword('')
                setConfirmPassword('')
            }
        }
    }


    let content = (
        <div className="resetpass-container">
            <img src={photo} alt=" " />
            <form onSubmit={onSubmit} className="resetpass-form">
                <h1> Change password </h1>
                <input type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="&#xf023; Password" />
                <input type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="&#xf023; Repeat password" />
                <input type="text"
                    required
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    placeholder="&#xf023; Enter code" />
                <button> Reset </button>
                <span> {message} </span>
            </form>
        </div>
    );

    return content;
}

export default ResetPass;