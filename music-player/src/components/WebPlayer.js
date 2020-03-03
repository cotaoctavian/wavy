import React from 'react';
import Player from './Player';

const WebPlayer = props => {
    

    let content = (
        <Player url="http://localhost:5000/images/song.mp3" />
    );
    return content;
}


export default WebPlayer