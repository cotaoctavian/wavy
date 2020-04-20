import React, { useState } from 'react';
import Header from './Header';
import { SongsContainer } from '../../assets/styles/adminpanel'

const AdminSongs = () => {

    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    let content = (
        <React.Fragment>
            <Header />
            <SongsContainer>
                <h1> Upload song </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        required
                        value={title}
                        placeholder="Title of the song"
                        onChange={(e) => setTitle(e.target.value)}
                    />

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
                        value={album}
                        placeholder="Name of the album"
                        onChange={(e) => setAlbum(e.target.value)}
                    />

                    <input
                        type="text"
                        required
                        value={genre}
                        placeholder="Name of the genre"
                        onChange={(e) => setGenre(e.target.value)}
                    />

                    <input
                        type="text"
                        required
                        value={duration}
                        placeholder="Duration of the song"
                        onChange={(e) => setDuration(e.target.value)}
                    />


                    <label> Select song </label>
                    <input
                        type="file"
                        required
                        placeholder="Select song"
                    />

                    <label> Select photo </label>
                    <input
                        type="file"
                        required
                        placeholder="Select photo"
                    />

                    <button> Upload </button>

                </form>

            </SongsContainer>

        </React.Fragment>

    );
    return content;
}

export default AdminSongs