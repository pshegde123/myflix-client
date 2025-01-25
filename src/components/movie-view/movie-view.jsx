import React from 'react'
import PropTypes from "prop-types";

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

MovieView.propTypes = {
  movie: PropTypes.arrayOf( 
    PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.shape({
      name:PropTypes.string,
      description:PropTypes.string
    }),
    director: PropTypes.shape({
      name:PropTypes.string,
      bio:PropTypes.string,
      birth_date: PropTypes.string,
      death_date:PropTypes.string
    })
  })).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView
