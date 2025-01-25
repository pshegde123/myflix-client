import React from 'react';
import PropTypes from "prop-types";

const MovieCard = ({movie,onMovieClick}) => {  
  const buttonStyle = {
    backgroundColor: 'grey',    
    color:'white',
    textAlign:'center',
    width:'20%',
    padding: '5px',    
    margin:'auto'
  };
  return (
    <div className='card' onClick={()=>{onMovieClick(movie)}} >
        <div className='card-body'>
            {movie.title}
        </div>      
    </div>
  )
}

MovieCard.propTypes = {
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
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard
