import React, { useState } from 'react';
import Header from './Header';
import { SongsContainer } from '../../assets/styles/adminpanel'
import Axios from 'axios';


const AdminSongs = () => {

    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [photo, setPhoto] = useState('');
    const [song, setSong] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('song', song);

        try {
            const result = await Axios.post(`http://localhost:5000/song/${title}/${artist}/${album}/${genre}/${duration}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data'}
            })

            console.log(result.data)
        } catch (err) {
            console.log(err)
        }

    }

    const updatePhoto = (e) => {
        setPhoto(e.target.files[0]);
    }

    const updateSong = (e) => {
        setSong(e.target.files[0]);
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
                        onChange={updateSong}
                    />

                    <label> Select photo </label>
                    <input
                        type="file"
                        required
                        onChange={updatePhoto}
                    />

                    <button> Upload </button>

                </form>

            </SongsContainer>

        </React.Fragment>

    );
    return content;
}

export default AdminSongs