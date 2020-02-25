import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ResetPass from './components/ResetPass';
import Reset from './components/Reset';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Player from './components/Player';
import ChangePassword from './components/ChangePassword';
import UpdateProfile from './components/UpdateProfile';

function App() {
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
        <Route exact path = "/player" component = {Player} />
        <Route exact path = "/change_password" component={ChangePassword} />
        <Route exact path = "/update_profile" component={UpdateProfile} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
