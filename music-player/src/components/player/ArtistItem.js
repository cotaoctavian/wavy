import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';


const ArtistItem = ({ id }) => {
    console.log(id)

    const [artist, setArtist] = useState(null)

    useEffect(() => {
        Axios.get(`http://localhost:5000/artist/${id}`)
            .then(res => {
                setArtist(res.data.artist)
            })
            .catch(err => console.log(err))
    }, [id])

    let content = (
        <React.Fragment>
            {artist != null ?
                <div>
                    <NavLink exact to={`/library/artists/${id}`} className="circle-nav-link">
                        <div>
                            <img src={`http://localhost:5000/${artist.photo}`} />
                            <p> {artist.name} </p> 
                            <span> {artist.followers} {artist.followers === 1 ? "follower" : "followers"} </span>
                        </div>
                    </NavLink>
                </div>
                :
                null}
        </React.Fragment>
    );
    return content;
}

export default ArtistItem;