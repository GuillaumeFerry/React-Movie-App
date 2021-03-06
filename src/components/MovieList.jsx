import React from 'react'

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    const { movies } = props;
    return (
        <>
            {movies && movies.map((movie, i) => (
                <div key={movie.imdbID} className='image-container d-flex justify-content-start m-3'>
                    <img src={movie.Poster} alt='movie poster' />
                    <div
                        onClick={() => props.handleFavouritesClick(movie)}
                        className='overlay d-flex align-items-center justify-content-center'
                    >
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;
