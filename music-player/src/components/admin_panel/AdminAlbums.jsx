import React, { useState } from 'react';
import Header from './Header';
import { AlbumsContainer } from '../../assets/styles/adminpanel'
import Axios from 'axios';

const AdminAlbum = () => {
    const [artist, setArtist] = useState('')
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [track, setTrack] = useState('')
    const [file, setFile] = useState(null)
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const formData = new FormData();
        formData.append('file', file);

        try {
            const result = await Axios.post(`http://localhost:5000/album/${artist}/${name}/${year}/${track}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(result.data)
        }
        catch (err) {
            console.log(err)
        }

    }

    const updatePhoto = (e) => {
        setFile(e.target.files[0])
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
                        placeholder="ID of the artist"
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

                    <input 
                        type="file"
                        onChange={updatePhoto}
                    />

                    <button> Upload </button>

                </form>

            </AlbumsContainer>

        </React.Fragment>

    );
    return content;

}

export default AdminAlbum;