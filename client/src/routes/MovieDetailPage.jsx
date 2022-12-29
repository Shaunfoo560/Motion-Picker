import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import styled from "styled-components";
import MovieAPI from '../apis/MovieAPI';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { MoviesContext } from '../context/MoviesContext';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { selectedMovie, setSelectedMovie } = useContext(MoviesContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await MovieAPI.get(`/${id}`);
      setSelectedMovie(response.data.data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <Nav>
        <Link to={"/"}>
          <IoMdHome size={65} color='brown' />
        </Link>
      </Nav>
      {selectedMovie && (
        <>
          <h1 className="font-weight-bold display-4 text-center">{selectedMovie.movie.name}</h1>
          <div className="text-center">
            <StarRating rating={selectedMovie.movie.average_rating} />
            <span className="text-danger ml-1">
              {selectedMovie.movie.count ? `(${selectedMovie.movie.count})` : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedMovie.reviews} />
          </div>
          <br></br>
          <br></br>
          <h1 className="font-weight-bold display-7 text-center">
            Add a review
          </h1>
          <AddReview />
          <br></br>
          <br></br>
        </>
      )}
    </div>
  )
};

const Nav = styled.div`
  padding: 1rem 0rem;
  margin-left: auto;
  margin-right: auto;
  width: 5.5%;
  font-size: 3rem;
`


export default MovieDetailPage;