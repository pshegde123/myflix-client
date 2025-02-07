import React from 'react'
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MovieView = ({movies}) => {    
  const { movieid } = useParams();
  const movie = movies.find((m) => m.id === movieid);  
  var user = JSON.parse(localStorage.getItem('user'));
  //console.log(user.Username);

  const handleAddToFavorite = () => {
    const data = {
      Username: user,            
      Movieid: movieid
    };

    fetch(`https://myflix-ph-1e58a204d843.herokuapp.com/users/${user.Username}/movies/${movieid}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Added To Favorites");
      } else {
        alert("Failed To Add To Favorites");
      }
    });
  };

  return (   
      <Card className="h-100">          
            <Card.Title>{movie.title}</Card.Title>     
            <Card.Img variant="top" src={movie.image}/>     
              <Card.Body>           
                <Card.Text>Plot: {movie.description}</Card.Text>
                <Card.Text>Genre Name: {movie.genre.name}</Card.Text>
                <Card.Text>Director Name: {movie.director.name}</Card.Text>
                <Row>
                  <Col className="md-3">
                    <Button onClick={handleAddToFavorite} size="sm">Add To Favorite</Button>  
                  </Col>                                     
                </Row>                                
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
