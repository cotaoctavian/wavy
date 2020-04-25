import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Header, Global, Links, Main, Menu, SongsList } from '../../assets/styles/webplayer';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SnackbarProvider } from 'notistack';
import Song from './Song';
import wavy from '../../assets/images/white_wave.png';
import '../../assets/css/Global.css';

const LikedSongs = props => {

    const handleSongUrl = (url, play, songId) => {
        props.handle(url, play, songId)
    }

    useEffect(() => {

    }, [props.songs, props.play])

    let content = (
        <React.Fragment>
            <SnackbarProvider maxSnack={1} preventDuplicate>
                <Global />
                <Header>
                    <div>
                        <img src={wavy} alt="" />
                        <span> <NavLink exact to="/player" className="header-nav-link">  wavy. </NavLink> </span>
                    </div>

                    <Links>
                        <span> <NavLink exact to="/player" className="header-player-link"> Home </NavLink> </span>
                        <span> <NavLink exact to="/hotlist" className="header-player-link"> Hotlist </NavLink></span>
                        <span> <NavLink exact to="/library/playlists" className="header-nav-link"> Library </NavLink></span>
                        <span> <NavLink exact to="/search" className="header-player-link"> <FontAwesomeIcon icon={faSearch} /> Search </NavLink> </span>
                    </Links>

                    {props.image.length > 0 ? <NavLink exact to="/profile" className="header-nav-link"> <img src={`http://localhost:5000/${props.image}`} className="img__library" alt="" /> </NavLink> : null}

                </Header>

                <Main>
                    <Menu>
                        <span> <NavLink exact to="/library/playlists" className="main-player-link"> PLAYLISTS </NavLink> </span>
                        <span> <NavLink exact to="/library/albums" className="main-player-link"> ALBUMS </NavLink> </span>
                        <span> <NavLink exact to="/library/tracks" className="main-nav-link"> LIKED SONGS </NavLink> </span>
                        <span> <NavLink exact to="/library/artists" className="main-player-link"> ARTISTS </NavLink> </span>
                        <span> <NavLink exact to="/library/made-for-you" className="main-player-link"> MADE FOR YOU </NavLink> </span>
                    </Menu>



                    <SongsList>
                        {props.songs.map((item, id) => {
                            if (props.songId != null) {
                                if (item === props.songId) {
                                    return <Song key={id} data={item} handle={handleSongUrl} handleLike={props.handleLike} playing={props.songIdState} hover={true} />
                                } else {
                                    return <Song key={id} data={item} handle={handleSongUrl} handleLike={props.handleLike} playing={false} hover={false} />
                                }
                            } else {
                                return <Song key={id} data={item} handle={handleSongUrl} handleLike={props.handleLike} playing={false} hover={false} />
                            }
                        })}
                    </SongsList>
                </Main>
            </SnackbarProvider>
        </React.Fragment>
    );
    return content;
}

export default LikedSongs