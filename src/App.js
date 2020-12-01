import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import moviesDb from './data.js';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favourites, setFavourites] = useState([]);

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`

        try {
            const response = await axios.get(url);
            console.log(response.data);

            if (response.data.Search) {
                setMovies(response.data.Search);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie];
        
        // check if movie already in favourites
        favourites.some(favourite => favourite.imdbID === movie.imdbID)
        ? console.log("Already in favourites!")
        : setFavourites(newFavouriteList)
    };

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );
        setFavourites(newFavouriteList);
    };


    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4' >
                <MovieListHeading heading='Movies' />
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className='row'>
                <MovieList
                    movies={movies}
                    favouriteComponent={AddFavourites}
                    handleFavouritesClick={addFavouriteMovie}
                />
            </div>
            <div className='row d-flex align-items-center mt-4 mb-4' >
                <MovieListHeading heading='Favourites' />
            </div>
            <div className='row'>
                <MovieList
                    movies={favourites}
                    favouriteComponent={RemoveFavourites}
                    handleFavouritesClick={removeFavouriteMovie}
                />
            </div>
        </div>
    );
};

export default App;
