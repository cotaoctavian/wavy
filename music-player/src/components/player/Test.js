import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import Song from './Song';
import Player from './Player';

const Test = () => {
    const userData = useSelector(state => state.user)

    let content = (
        <h1> Hello </h1>
    );
    return content;
}

export default Test;