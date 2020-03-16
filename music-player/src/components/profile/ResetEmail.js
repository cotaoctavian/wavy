import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { ResetContainer, ResetForm, ResetCell1, ResetCell2, ResetCell3, Global } from '../../assets/styles/reset';


const Reset = props => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        setEmail(email)
    }, [email])

    useEffect(() => {
        return () => {
            document.body.classList.remove('reset-body')
            document.body.classList.remove('dashboard-back')
        }
    }, [])

    const onSubmit = event => {
        event.preventDefault()

        const data = {
            email: email
        }

        Axios.post("http://localhost:5000/reset/", data)
            .then(res => {
                setMessage(res.data)
            })
            .catch(err => console.log(err))
    }

    let content = (
        <React.Fragment>
            <Global />
            <ResetContainer>
                <h1> Password Reset </h1>
                <p> Enter your username, or the email address that you used to register. We'll send you an email with your username and a link to reset your password. </p>
                <span> Enter your username or email address </span>
                <ResetForm onSubmit={onSubmit}>
                    <ResetCell1
                        required
                        value={email}
                        type="text"
                        onChange={e => setEmail(e.target.value)}
                        placeholder="&#xf040;"
                    />
                    <ResetCell2> SEND </ResetCell2>
                    <ResetCell3> {message} </ResetCell3>
                </ResetForm>
            </ResetContainer>
        </React.Fragment >
    );

    return content;
}

export default Reset