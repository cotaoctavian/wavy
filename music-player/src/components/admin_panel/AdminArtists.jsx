import React, { useState } from 'react';
import Header from './Header';
import { ArtistsContainer } from '../../assets/styles/adminpanel';

const AdminArtists = () => {

    const [name, setName] = useState('')
    const [album, setAlbum] = useState('')
    const [solo, setSolo] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

    }

    const updatePhoto = () => {

    }

    let content = (
        <React.Fragment>
            <Header />
            <ArtistsContainer>
                <h1> Upload artist </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        required
                        value={name}
                        placeholder="Name of the artist"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        value={album}
                        placeholder="Name of the album"
                        onChange={(e) => setAlbum(e.target.value)} />

                    <input
                        type="text"
                        value={solo}
                        placeholder="Name of the solo"
                        onChange={(e) => setSolo(e.target.value)} />

                    <label> Select artist's photo </label>
                    <input
                        type="file"
                        required
                        onChange={updatePhoto}
                    />

                    <button>  Upload </button>

                </form>

            </ArtistsContainer>

        </React.Fragment>
    );
    return content;
}

export default AdminArtists;