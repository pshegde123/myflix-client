import React from 'react'
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const MovieView = ({movies}) => {    
  const { movieid } = useParams();
  const movie = movies.find((m) => m.id === movieid);  

  return (   
      <Card className="h-100">          
            <Card.Title>{movie.title}</Card.Title>     
            <Card.Img variant="top" src={movie.image}/>     
              <Card.Body>           
                <Card.Text>Plot: {movie.description}</Card.Text>
                <Card.Text>Genre Name: {movie.genre.name}</Card.Text>
                <Card.Text>Director Name: {movie.director.name}</Card.Text>
              </Card.Body>
            <Link to="/movies">
              <Button className='button' >Back</Button>     
            </Link>            
      </Card>    
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
