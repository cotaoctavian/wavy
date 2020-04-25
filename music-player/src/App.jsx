import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/admin_panel/PrivateRoute';
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
import AdminPanel from './components/admin_panel/AdminPanel';
import AdminArtists from './components/admin_panel/AdminArtists';
import AdminAlbums from './components/admin_panel/AdminAlbums';
import AdminSongs from './components/admin_panel/AdminSongs';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/resetpass" component={ResetPass} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/change_password" component={ChangePassword} />
        <Route exact path="/update_profile" component={UpdateProfile} />
        <Route exact path="/player" component={WebPlayer} />
        <Route exact path="/library/albums" component={WebPlayer} />
        <Route exact path="/library/tracks" component={WebPlayer} />
        <Route exact path="/library/playlists" component={WebPlayer} />
        <Route path="/library/playlists/:id" component={WebPlayer} />
        <Route path="/library/artists/:id" component={WebPlayer} />
        <Route exact path="/library/artists" component={WebPlayer} />
        <Route path="/library/album/:id" component={WebPlayer} />
        <Route exact path="/search" component={WebPlayer} />
        <Route exact path="/panel" component={AdminPanel} />
        <PrivateRoute exact path="/admin/artists" component={AdminArtists} />
        <PrivateRoute exact path="/admin/albums" component={AdminAlbums} />
        <PrivateRoute exact path="/admin/songs" component={AdminSongs} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
