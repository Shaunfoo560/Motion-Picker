import React, { useState, createContext } from "react";

export const MoviesContext = createContext();

export const MoviesContextProvider = (props) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const addMovies = (movie) => {
        setMovies([...movies, movie]);
    };
    return (
        <MoviesContext.Provider value={{ movies, setMovies, addMovies, selectedMovie, setSelectedMovie }}>
            {props.children}
        </MoviesContext.Provider>
    );
};