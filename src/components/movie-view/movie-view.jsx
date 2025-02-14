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
    <>
      <Card className='mt-4'>          
            <Card.Header className="text-center bg-warning" style={{fontSize:"32px"}}>{movie.title}</Card.Header>  
            <Row>
                <Col>
                <div className='d-flex flex-column'>
                  <div className='d-flex justify-content-center'>
                    <Card.Img variant="top" src={movie.image} style={{minHeigh:"200px" , width:"50%"}} className='mt-2'/>                                                     
                  </div>              
                  <div className='mt-2 d-flex justify-content-center'>
                    <Button onClick={handleAddToFavorite}  className='bg-danger'>Add To Favorite</Button> 
                  </div>              
                </div>          
                </Col>   
              <Col>
                <Card.Body>           
                  <Card.Text>Plot: {movie.description}</Card.Text>
                  <Card.Text>Genre Name: {movie.genre.name}</Card.Text>
                  <Card.Text>Director Name: {movie.director.name}</Card.Text>                                            
                </Card.Body>
              </Col>   
            </Row>                                           
      </Card>    
      <div className='d-flex justify-content-end'>
        <Link to="/movies">
          <Button className='button mt-4' >Back</Button>     
        </Link>     
      </div>
    </>
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
