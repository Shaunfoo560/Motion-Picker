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

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        navigate(`/movies/${id}/update`);
    };

    const handleMovieSelect = (id) => {
        navigate(`/movies/${id}`);
    }

    const renderRating = (movie) => {

        if (!movie.count) {
            return <span className="text-danger">No reviews yet</span>
        }
        return (
            <>
                <StarRating rating={movie.average_rating} />
                <span className="text-danger ml-1">({movie.count})</span>
            </>
        );
    };

    return (
        <div className="list-group">
            <table className="table table-striped table-hover table-light">
                <thead style={{ fontSize: "1.2rem", fontWeight: "700"}}>
                    <tr className="bg-danger">
                        <th scope="col" className="text-center">Movie</th>
                        <th scope="col" className="text-center">Genre</th>
                        <th scope="col" className="text-center">Shaun's Rating</th>
                        <th scope="col" className="text-center">Score</th>
                        <th scope="col" className="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {movies && movies.map((movie) => {
                        return (
                            <tr onClick={() => handleMovieSelect(movie.id)} key={movie.id}>
                                <td className="text-center" style={{ fontSize: "1.1rem", fontWeight: "550", cursor: "pointer"}}>{movie.name}</td>
                                <td className="text-center" style={{ fontSize: "1.1rem", fontWeight: "550", cursor: "pointer"}}>{movie.genre}</td>
                                <td className="text-center" style={{ fontSize: "1.1rem", fontWeight: "550", cursor: "pointer"}}>{movie.shaun_rating}</td>
                                <td className="text-center" style={{ fontSize: "1.1rem", fontWeight: "550", cursor: "pointer"}}>{renderRating(movie)}</td>
                                <td className="text-center" style={{ fontSize: "1.1rem", fontWeight: "550", cursor: "pointer"}}><button onClick={(e) => handleUpdate(e, movie.id)} className="btn btn-warning">Edit Details</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default MovieList