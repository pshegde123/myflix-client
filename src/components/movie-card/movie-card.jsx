import React from 'react';
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const MovieCard = ({movie}) => {  
  const buttonStyle = {
    backgroundColor: 'grey',    
    color:'white',
    textAlign:'center',
    width:'20%',
    padding: '5px',    
    margin:'auto'
  };
  return (
    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={movie.image} />
          <Card.Body className='bg-warning justify-content-center'>
            <Card.Title className='text-center'>
              {movie.title}
            </Card.Title>                   
          </Card.Body>      
      </Card>
    </Link>
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
