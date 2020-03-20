import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { ContainerPlayer, Global, TimerDiv, OptionsDiv, SongInformation } from '../../assets/styles/player';
import PlayCircleOutlineSharpIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import PauseCircleOutlineSharpIcon from '@material-ui/icons/PauseCircleOutlineSharp';
import SkipPreviousSharpIcon from '@material-ui/icons/SkipPreviousSharp';
import SkipNextSharpIcon from '@material-ui/icons/SkipNextSharp';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles({
    root: {
        width: 90,
        paddingTop: 5,
    },

    trackSlider: {
        width: 500
    }
});

const Player = ({handleLike, songInfo, audio, url, play, changePlay, likeState}) => {
    const classes = useStyles();
    // const [audio, setAudio] = useState("");
    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(40)
    const [totalTrackTime, setTotalTrackTime] = useState(null)
    const [repeatMode, setRepeatMode] = useState(0)
    const [shuffle, setShuffle] = useState(false)
    const [reset, setReset] = useState(false)
    const [like, setLike] = useState(true)

    const formatSecondsAsTime = (secs) => {
        var hr = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hr * 3600)) / 60);
        var sec = Math.floor(secs - (hr * 3600) - (min * 60));

        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }

        return min + ':' + sec;
    }

    // Button play pressed from another component.
    useEffect(() => {
        setPlaying(play)
        setLike(likeState)
    }, [play, likeState])


    // Change track by the url from props.
    useEffect(() => {
        audio.src = `http://localhost:5000/${url}`;
        audio.play();
        if (url !== "") {
            audio.pause()
        }
        setPlaying(true)
        setReset(true)
        setDuration(null)
        setCurrentTime(null)
        setTotalTrackTime(null)
    }, [url])


    // Player functionality.
    useEffect(() => {
        document.body.classList.remove('dashboard-back');
        if (audio instanceof Audio) {
            if (playing) {
                if (reset === true) {
                    audio.load();
                    audio.addEventListener('loadedmetadata', (e) => {
                        setTotalTrackTime(e.target.duration)
                        setDuration(formatSecondsAsTime(Math.floor(e.target.duration).toString()));
                    });
                    setReset(false)
                }
                audio.play();
            } else {
                audio.pause();
            }

            audio.addEventListener('timeupdate', (e) => {
                setCurrentTime(formatSecondsAsTime(e.target.currentTime))
            })

            if (repeatMode === 2) {
                audio.addEventListener('ended', (e) => {
                    audio.currentTime = 0
                })
            }

            audio.volume = volume / 100;

        }
    }, [playing, volume, duration, totalTrackTime, currentTime, audio, url])

    useEffect(() => {
        return () => {
            setPlaying(false)
            setCurrentTime(null)
            setDuration(null)
        }
    }, [audio, url])

    const togglePlay = () => {
        changePlay(!playing);
        setPlaying(!playing);
    }

    const toggleVolume = (event, volume) => {
        setVolume(volume);
    };

    // TODO -> SKIP TO THE NEXT SONG 
    const toggleForward = () => {
        console.log("next")
    }

    // TODO -> SKIP TO THE PREVIOUS SONG
    const toggleBackward = () => {
        console.log("back")
    }

    const toggleTime = (event, time) => {
        audio.currentTime = time;
    }

    const toggleLike = () => {
        setLike(!like);
        handleLike(!like, url);
    }

    const toggleRepeat = () => {
        if (repeatMode === 0) setRepeatMode(1);
        else if (repeatMode === 1) setRepeatMode(2);
        else if (repeatMode === 2) setRepeatMode(0);
    }

    const toggleShuffle = () => {
        if (shuffle === true) setShuffle(false)
        else setShuffle(true)
    }

    let content = (
        <React.Fragment>
            <Global />
            {audio !== "" ?
                <ContainerPlayer>
                    <button onClick={toggleBackward}> <SkipPreviousSharpIcon style={{ fontSize: 30 }} /> </button>
                    <button onClick={togglePlay}> {playing ? <PauseCircleOutlineSharpIcon style={{ fontSize: 40 }} /> : <PlayCircleOutlineSharpIcon style={{ fontSize: 40 }} />} </button>
                    <button onClick={toggleForward}> <SkipNextSharpIcon style={{ fontSize: 30 }} /> </button>
                    <TimerDiv>
                        <span> {currentTime} </span>
                        <span> / </span>
                        <span> {duration} </span>
                    </TimerDiv>

                    <div className={classes.trackSlider}>
                        <Tooltip TransitionComponent={Zoom} title={formatSecondsAsTime(Math.floor(audio.currentTime).toString())}>
                            <Grid container spacing={1}>
                                <Grid item xs>
                                    <Slider
                                        min={0}
                                        step={1}
                                        max={totalTrackTime}
                                        value={Math.floor(audio.currentTime)}
                                        onChange={toggleTime}
                                        aria-labelledby="continuous-slider"
                                        style={{ color: "white" }} />
                                </Grid>
                            </Grid>
                        </Tooltip>
                    </div>


                    <SongInformation>
                        {songInfo !== null ? 
                            <img src={`http://localhost:5000/${songInfo.photo_path}`} alt ="" /> : null } 
                        {songInfo !== null ? 
                            <div> 
                                <span> {songInfo.title} </span>
                                <span> {songInfo.artist} &#8226; {songInfo.album} </span> 
                            </div> 
                            : null}
                        {songInfo !== null ? 
                            <button onClick={toggleLike}> {like ? <FavoriteIcon style={{color: "white"}} /> : <FavoriteBorderIcon style={{color: "white"}} />}  </button> 
                            : null
                        }
                        
                    </SongInformation>

                    <OptionsDiv>
                        <div className={classes.root}>
                            <Tooltip TransitionComponent={Zoom} title={volume}>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <Slider
                                            min={0}
                                            step={1}
                                            max={100}
                                            value={volume}
                                            onChange={toggleVolume}
                                            aria-labelledby="continuous-slider"
                                            style={{ color: "white" }} />
                                    </Grid>
                                    <Grid item>
                                        <VolumeUp style={{ width: 20, paddingTop: 2, color: "white" }} />
                                    </Grid>
                                </Grid>
                            </Tooltip>

                        </div>

                        {repeatMode === 0 ?
                            <Tooltip TransitionComponent={Zoom} title="Repeat none">
                                <button onClick={toggleRepeat}> <RepeatIcon style={{ width: 20, paddingTop: 5, color: "#bbc0c7", fontSize: 25 }} /> </button>
                            </Tooltip> : null}

                        {repeatMode === 1 ?
                            <Tooltip TransitionComponent={Zoom} title="Repeat all">
                                <button onClick={toggleRepeat}> <RepeatIcon style={{ width: 20, paddingTop: 5, color: "white", fontSize: 25 }} /> </button>
                            </Tooltip> : null}

                        {repeatMode === 2 ?
                            <Tooltip TransitionComponent={Zoom} title="Repeat one">
                                <button onClick={toggleRepeat}><RepeatOneIcon style={{ width: 20, paddingTop: 5, color: "white", fontSize: 25 }} /> </button>
                            </Tooltip> : null}

                        {shuffle === false ?
                            <Tooltip TransitionComponent={Zoom} title="Shuffle off">
                                <button onClick={toggleShuffle}> <ShuffleIcon style={{ width: 20, paddingTop: 5, color: "#bbc0c7", fontSize: 25 }} /> </button>
                            </Tooltip>
                            :
                            <Tooltip TransitionComponent={Zoom} title="Shuffle on">
                                <button onClick={toggleShuffle}> <ShuffleIcon style={{ width: 20, paddingTop: 5, color: "white", fontSize: 25 }} /> </button>
                            </Tooltip>}

                    </OptionsDiv>
                </ContainerPlayer> : null}

        </React.Fragment>
    );

    return content;
}

export default Player;