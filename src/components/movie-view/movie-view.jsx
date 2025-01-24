import React from 'react'

const MovieView = ({movie,onBackClick}) => {  
  return (
    <div className='card'>
        <div className="card-body">
            <h5>{movie.title}</h5>     
            <img src={movie.image}/>                
            <p className='card-text'>Plot: {movie.description}</p>
            <p className='card-text'>Genre Name: {movie.genre.name}</p>
            <p className='card-text'>Director Name: {movie.director.name}</p>
        </div>
        <button className='button' onClick={onBackClick}>Back</button>
    </div>
  );  
}

export default MovieView
