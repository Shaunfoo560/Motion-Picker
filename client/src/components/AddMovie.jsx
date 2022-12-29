import React, { useState, useContext } from 'react'
import MovieAPI from '../apis/MovieAPI';
import { MoviesContext } from '../context/MoviesContext';

const AddMovie = () => {
    const { addMovies } = useContext(MoviesContext);
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [shaunRating, setShaunRating] = useState("Shaun's Rating");

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await MovieAPI.post("/", {
            name,
            genre,
            shaun_rating: shaunRating,
        });
        addMovies(response.data.data.movie);
    }
    return (
        <div style={{ justifyContent: 'center' }}>
            <form action="">
                <div className="form-group font-weight-bold">
                    <label htmlFor="name">Movie name</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Movie Name" />
                </div>
                <br></br>
                <div className="form-group font-weight-bold">
                    <label htmlFor="name">Genre</label>
                    <input value={genre} onChange={e => setGenre(e.target.value)} className="form-control" type="text" placeholder="Genre" />
                </div>
                <br></br>
                <div className="form-group font-weight-bold">
                    <label htmlFor="name">Shaun's Rating</label>
                    <select value={shaunRating} onChange={e => setShaunRating(e.target.value)} className="custom-select">
                        <option disabled>Shaun's Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={handleSubmit} type="submit" className="btn btn-success">Add Movie</button>
                </div>
                <br></br>
                <br></br>
                <br></br>
            </form>
        </div>
    )
}

export default AddMovie