import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ResetPass from './components/auth/ResetPass';
import Reset from './components/profile/ResetEmail';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Profile from './components/profile/Profile';
import WebPlayer from './components/player/WebPlayer';
import ChangePassword from './components/auth/ChangePassword';
import UpdateProfile from './components/profile/UpdateProfile';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/register" component = {Register} />
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/reset" component = {Reset} />
        <Route exact path = "/resetpass" component = {ResetPass} />
        <Route exact path = "/dashboard" component = {Dashboard} />
        <Route exact path = "/profile" component = {Profile} />
        <Route exact path = "/change_password" component={ChangePassword} />
        <Route exact path = "/update_profile" component={UpdateProfile} />
        <Route exact path = "/player" component = {WebPlayer} />
        <Route exact path = "/library" component={WebPlayer} />
        <Route exact path = "/library/tracks" component={WebPlayer} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
