import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {SongDiv} from '../../assets/styles/song';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


const Song = props => {
    const [song, setSong] = useState('')

    useEffect(() => {
        Axios.post("http://localhost:5000/song", { song: props.data })
            .then(res => {
                setSong(res.data.info)
            })
            .catch(err => console.log(err))
    }, [])

    const togglePlay = () => {
        props.handle(song.path)
    }

    let content = (
        <SongDiv>
            <button onClick={togglePlay}> <PlayArrowIcon style={{color:"white"}}/> </button> 
            <span> {song.title} </span>
            <span> {song.artist} </span>
            <span> {song.album} </span>
            <span> {song.duration} </span>
        </SongDiv>

    );
    return content;
}

export default Song;