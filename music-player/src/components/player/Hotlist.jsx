import React, { useState, useEffect } from 'react';

/* Routes */
import { NavLink } from 'react-router-dom';

/* Redux */
import { useSelector } from 'react-redux';

/* Styling */
import { Header, Global, Links } from '../../assets/styles/webplayer';
import { MainContainer, SongContainer } from '../../assets/styles/hotlist';

/* Icons & Images */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import wavy from '../../assets/images/white_wave.png';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

/* Axios */
import axios from 'axios';


const SongItem = ({ songData, handleUrl, songState }) => {
    const [song, setSong] = useState(undefined);
    const [playing, setPlaying] = useState(false)

    console.log(songState);

    useEffect(() => {
        axios.post("http://localhost:5000/song", { song: songData._id })
            .then(res => {
                setSong(res.data.info)
            })
            .catch(err => console.log(err))
        setPlaying(songState)
    }, [songData, songState])

    const togglePlay = () => {
        handleUrl(song.path, !playing, songData._id);
        setPlaying(!playing)
    }

    let content = (
        <React.Fragment>
            {song !== undefined ?
                <SongContainer >
                    <div>
                        <img src={`http://localhost:5000/${song.photo_path}`} alt="" />
                        <div>
                            <span> {song.artist} -  {song.title} </span>
                            {!playing ? <PlayCircleFilledRoundedIcon onClick={togglePlay} /> : <PauseCircleFilledIcon onClick={togglePlay} />}
                        </div>
                    </div>
                </SongContainer>
                :
                null}
        </React.Fragment>
    )
    return content;
}


const Hotlist = ({ handleUrl, songId, songIdState }) => {

    const user = useSelector(state => state.user)
    const [songsList, setSongsList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/song/views")
            .then((response) => {
                console.log(response.data.message);
                setSongsList(response.data.message);
            })
            .catch((error) => console.log(error))

    }, []);

    let content = (
        <React.Fragment>
            <Global />
            <Header>
                <div>
                    <img src={wavy} alt="" />
                    <span> <NavLink exact to="/player" className="header-nav-link">  wavy. </NavLink> </span>
                </div>

                <Links>
                    <span> <NavLink exact to="/player" className="header-player-link"> Home </NavLink> </span>
                    <span> <NavLink exact to="/hotlist" className="header-nav-link"> Hotlist </NavLink></span>
                    <span> <NavLink exact to="/library/playlists" className="header-player-link"> Library </NavLink></span>
                    <span> <NavLink exact to="/search" className="header-player-link"> <FontAwesomeIcon icon={faSearch} /> Search </NavLink> </span>
                </Links>

                <NavLink exact to="/profile" className="header-nav-link"> <img src={`http://localhost:5000/${user.img}`} alt="" className="img__library" /> </NavLink>
            </Header>


            <MainContainer>
                {songsList.length > 0 ?
                    songsList.map((song, index) => {
                        if (song._id === songId) {
                            return <SongItem key={index} songData={song} handleUrl={handleUrl} songState={songIdState} />
                        } else return <SongItem key={index} songData={song} handleUrl={handleUrl} songState={false} />
                    }) : null}
            </MainContainer>


        </React.Fragment>
    );
    return content;
}


export default Hotlist;