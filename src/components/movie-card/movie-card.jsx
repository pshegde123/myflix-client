import React from 'react';
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";


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
    <Card onClick={()=>{onMovieClick(movie)}} style={{ width: '18rem' }}>
       <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>
            {movie.title}
          </Card.Title>          
        </Card.Body>      
    </Card>
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
