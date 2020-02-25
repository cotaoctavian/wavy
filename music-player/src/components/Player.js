import React, { useEffect } from 'react';

const Player = props => {

    useEffect(() => {
        document.body.classList.remove('dashboard-back');
    }, [])


    let content = (
        <p> This page is not available. </p>
    );

    return content;
}

export default Player;