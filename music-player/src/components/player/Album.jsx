import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

const Album = ({ id }) => {

    const [albumData, setAlbumData] = useState(null)

    useEffect(() => {
        Axios.get(`http://localhost:5000/album/${id}`)
            .then(res => {
                setAlbumData(res.data.album)
            })
            .catch(err => console.log(err))
    }, [id])

    let content = (
        <div>
            {albumData !== null ?
                <React.Fragment>
                    <NavLink exact to={`/library/album/${id}`} className="squared-nav-link-200"> <img src={`http://localhost:5000/${albumData.photo}`} /> </NavLink>
                    <span> {albumData.name} </span>
                </React.Fragment>
                :
                null}
        </div>
    );
    return content;
}

export default Album;