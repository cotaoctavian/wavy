import React, { useState } from 'react';
import Header from './Header';
import { ArtistsContainer } from '../../assets/styles/adminpanel';
import Axios from 'axios';

const AdminArtists = () => {

    const [name, setName] = useState('')
    const [album, setAlbum] = useState('')
    const [solo, setSolo] = useState('')
    const [file, setFile] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData();
        formData.append('file', file);

        // name, album, solo, file  
        if (name.length > 0 && solo.length > 0 && album.length === 0) {
            try {
                const result = await Axios.post(`http://localhost:5000/artist/1/${name}/${solo}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(result.data)
            }
            catch (err) {
                console.log(err)
            }
        } else if(name.length > 0 && solo.length === 0 && album.length > 0) {
            try {
                const result = await Axios.post(`http://localhost:5000/artist/2/${name}/${album}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(result.data)
            }
            catch (err) {
                console.log(err)
            }
        } else if(name.length > 0 && solo.length > 0 && album.length > 0) {
            try {
                const result = await Axios.post(`http://localhost:5000/artist/${name}/${album}/${solo}`, formData, { 
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
    } 

    const updatePhoto = (e) => {
        setFile(e.target.files[0])
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