import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import moviesDb from './data.js';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const getMovieRequest = async () => {
        const url = `http://www.omdbapi.com/?s=star wars&apikey=${process.env.REACT_APP_API_KEY}`

        try {
            const response = await axios.get(url);
            console.log(response.data);

            if (response.data.Search) {
                setMovies(response.data.Search);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMovieRequest();
    }, [])

    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4' >
                <MovieListHeading heading='Movies' />
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className='row'>
                <MovieList movies={movies} />
            </div>
        </div>
    );
};

export default App;
