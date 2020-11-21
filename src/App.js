import React, { useState, useEffect } from 'react';
import moviesDb from './data.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState(moviesDb)

    return (
        <div className='container-fluid movie-app'>
            <div className='row'>
                <p>{movies[0].Title}</p>
            </div>
        </div>
    )
}

export default App;
