import React, { useState } from 'react';
import Header from './Header';
import { AlbumsContainer } from '../../assets/styles/adminpanel'


const AdminAlbum = () => {
    const [artist, setArtist] = useState('')
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [track, setTrack] = useState('')
    
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    let content = (
        <React.Fragment> 
            <Header />
            <AlbumsContainer>
                <h1> Upload album </h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        required
                        value={artist}
                        placeholder="Name of the artist"
                        onChange={(e) => setArtist(e.target.value)}
                    />

                    <input 
                        type="text"
                        required
                        value={name}
                        placeholder="Name of the album"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input 
                        type="text"
                        required
                        value={year}
                        placeholder="Year of the album"
                        onChange={(e) => setYear(e.target.value)}
                    />

                    <input
                        type="text"
                        required
                        value={track}
                        placeholder="Track of the album"
                        onChange={(e) => setTrack(e.target.value)}
                    />

                    <button> Upload </button>

                </form>

            </AlbumsContainer>

        </React.Fragment>

    );
    return content;

}

export default AdminAlbum;