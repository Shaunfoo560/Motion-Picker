import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import MovieAPI from '../apis/MovieAPI';
import { MoviesContext } from '../context/MoviesContext';

const UpdateMovie = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { movies } = useContext(MoviesContext);
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [shaun_rating, setShaunRating] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await MovieAPI.get(`/${id}`);
            console.log(response);
            setName(response.data.data.movie.name);
            setGenre(response.data.data.movie.genre);
            setShaunRating(response.data.data.movie.shaun_rating);
        }

        fetchData()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMovie = await MovieAPI.put(`/${id}`, {
            name,
            genre,
            shaun_rating,
        });
        navigate("/");
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form action="">
                <div className="form-group font-weight-bold text-center">
                    <label htmlFor="name">Movie name</label>
                    <input value={name} onChange={e => setName(e.target.value)}
                        id="name" className="form-control text-center" type="text" />
                </div>
                <br></br>
                <div className="form-group font-weight-bold text-center">
                    <label htmlFor="genre">Genre</label>
                    <input value={genre} onChange={e => setGenre(e.target.value)}
                        id="genre" className="form-control text-center" type="text" />
                </div>
                <br></br>
                <div className="form-group font-weight-bold text-center">
                    <label htmlFor="shaun_rating">Shaun's Rating</label>
                    <input value={shaun_rating} onChange={e => setShaunRating(e.target.value)}
                        id="shaun_rating" className="form-control text-center" type="number" />
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">Update entry</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateMovie