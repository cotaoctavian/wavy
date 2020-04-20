import React, { useState, useEffect } from 'react';
import { AdminContainer, Global } from '../../assets/styles/adminpanel';
import Auth from './Auth';
import { withRouter } from 'react-router';

const AdminPanel = ({ history }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()

        if (username === "licenta2020" && password === "licenta2k20") {
            Auth.login();
            history.push('/admin/artists');
        } else setMessage("The username or the password is incorrect.")
    }

    let content = (
        <React.Fragment>
            <Global />
            <AdminContainer>
                <h2> Admin Panel <span role="img" aria-label=""> 🌊 </span> </h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />


                    <input
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit"> Login </button> 
                    <p> {message} </p>
                </form>
               
            </AdminContainer>
        </React.Fragment>
    );
    return content;
}

export default withRouter(AdminPanel);