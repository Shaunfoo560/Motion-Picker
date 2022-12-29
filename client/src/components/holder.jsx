import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import MovieAPI from '../apis/MovieAPI'
import { MoviesContext } from '../context/MoviesContext'
import StarRating from './StarRating';

const MovieList = (props) => {
    const { movies, setMovies } = useContext(MoviesContext);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await MovieAPI.get("/");
                setMovies(response.data.data.movie);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const response = await MovieAPI.delete(`/${id}`);
            setMovies(movies.filter((movie) => {
                return movie.id !== id;
            })
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        navigate(`/movies/${id}/update`);
    };

    const handleMovieSelect = (id) => {
        navigate(`/movies/${id}`);
    }

    const renderRating = (movie) => {

        if (!movie.count) {
            return <span className="text-warning">No reviews yet</span>
        }
        return (
            <>
                <StarRating rating={movie.average_rating} />
                <span className="text-warning ml-1">({movie.count})</span>
            </>
        );
    };

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Movie</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Shaun's Rating</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {movies && movies.map((movie) => {
                        return (
                            <tr onClick={() => handleMovieSelect(movie.id)} key={movie.id}>
                                <td>{movie.name}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.shaun_rating}</td>
                                <td>{renderRating(movie)}</td>
                                <td><button onClick={(e) => handleUpdate(e, movie.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={(e) => handleDelete(e, movie.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default MovieList