import React from 'react';
import AddMovie from '../components/AddMovie';
import Header from '../components/Header';
import MovieList from '../components/MovieList';

const Home = () => {
  document.body.style = 'background: bisque;';
  return <div>
    <Header />
    <br></br>
    <MovieList />
    <br></br>
    <br></br>
    <h1 className="font-weight-bold display-7 text-center">
      Add a movie to be rated
    </h1>
    <AddMovie />
  </div>;
}

export default Home;