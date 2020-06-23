import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* Private routes */
import PrivateRoute from './components/admin_panel/PrivateRoute';
import PrivateUserRoute from './components/player/PrivateUserRoute';

/* Auth */
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ResetPass from './components/auth/ResetPass';
import Reset from './components/auth/ResetEmail';

/* Dashboard */
import Home from './components/Home';
import Dashboard from './components/Dashboard';

/* Profile */
import Profile from './components/profile/Profile';
import ChangePassword from './components/profile/ChangePassword';
import UpdateProfile from './components/profile/UpdateProfile';
import ArtistPanel from './components/profile/ArtistPanel';
import EditPanel from './components/profile/EditPanel';

/* Web player */
import WebPlayer from './components/player/WebPlayer';

/* Admin Panel */
import AdminPanel from './components/admin_panel/AdminPanel';
import AdminArtists from './components/admin_panel/AdminArtists';
import AdminAlbums from './components/admin_panel/AdminAlbums';
import AdminSongs from './components/admin_panel/AdminSongs';


const App = () => {
  return (
    <React.Fragment>
      <Switch>

        {/* Auth */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/resetpass" component={ResetPass} />

        {/* Dashboard */}
        <Route exact path="/" component={Home} />
        <PrivateUserRoute exact path="/dashboard" component={Dashboard} />

        {/* Profile pages */}
        <PrivateUserRoute exact path="/profile" component={Profile} />
        <PrivateUserRoute exact path="/change_password" component={ChangePassword} />
        <PrivateUserRoute exact path="/update_profile" component={UpdateProfile} />
        <PrivateUserRoute exact path="/artist_panel" component={ArtistPanel} />
        <PrivateUserRoute exact path="/edit_panel" component={EditPanel} />

        {/* Web player */}
        <PrivateUserRoute exact path="/player" component={WebPlayer} />
        <PrivateUserRoute exact path="/hotlist" component={WebPlayer} />
        <PrivateUserRoute exact path="/library/albums" component={WebPlayer} />
        <PrivateUserRoute exact path="/library/tracks" component={WebPlayer} />
        <PrivateUserRoute exact path="/library/playlists" component={WebPlayer} />
        <PrivateUserRoute path="/library/playlists/:id" component={WebPlayer} />
        <PrivateUserRoute path="/library/artists/:id" component={WebPlayer} />
        <PrivateUserRoute path="/library/made-for-you" component={WebPlayer} />
        <PrivateUserRoute exact path="/library/artists" component={WebPlayer} />
        <PrivateUserRoute path="/library/album/:id" component={WebPlayer} />
        <PrivateUserRoute exact path="/search" component={WebPlayer} />

        {/* Admin panel */}
        <Route exact path="/panel" component={AdminPanel} />
        <PrivateRoute exact path="/admin/artists" component={AdminArtists} />
        <PrivateRoute exact path="/admin/albums" component={AdminAlbums} />
        <PrivateRoute exact path="/admin/songs" component={AdminSongs} />

      </Switch>
    </React.Fragment>
  );
}

export default App;
