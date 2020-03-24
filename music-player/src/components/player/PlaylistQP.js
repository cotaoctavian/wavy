import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const PlaylistQP = (props) => {

    const [playlistTitle, setPlaylistTitle] = useState('')
    const [playlistSongs, setPlaylistSongs] = useState([])

    useEffect(() => {

        Axios.post("http://localhost:5000/playlist/", { id: props.match.params.id })
            .then(res => {
                setPlaylistTitle(res.data.playlist.title);
                setPlaylistSongs(res.data.playlist.songs);
            })
            .catch(err => console.log(err))

    }, [playlistTitle])

    let content = (
        <p> {playlistTitle} </p>
    );
    return content;
}

export default PlaylistQP;