import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Button, Card,Row,Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';

function MySuccessModal(props) {  
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-success text-white" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Success
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>        
        <p className='text-center'>
          Added To Favorites
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const MovieCard = ({movie,user,isFavorite}) => {      
  const [modalShow, setModalShow] = useState(false);  
  const [removeFav, setRemoveFav] = useState(false);  
  
  const handleAddToFavorite = () => {   
    const data = {
      Username: user,            
      Movieid: movie.id
    };
    fetch(`https://myflix-ph-1e58a204d843.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {      
      if (response.ok) {
        alert("Added To Favorites");    
        //setModalShow(true);
        window.location.reload();                 
      } else {
        alert("Failed To Add To Favorites");        
      }
    });
  };
 
  return (
    /*<Link to={`/movies/${encodeURIComponent(movie.id)}`}>*/
    <>    
      <Card style={{ width: '18rem' }} className='m-auto'>        
        <Card.Header className='bg-dark text-white text-center'>{movie.title}</Card.Header>
        <Card.Img variant="top" src={movie.image}  alt={movie.title}/>
          <Card.Body className='bg-dark'>
            <Row>
              <Col className='xs-12'>
                <Button variant="outline-primary"><Link to={`/movies/${encodeURIComponent(movie.id)}`}>View Details</Link></Button>
              </Col>
              <Col className='xs-12'>
                {isFavorite?                
                (<Button variant={'secondary'}  disabled={true}>+ Favorite</Button>):
                (<Button variant={'success'} onClick={()=>{handleAddToFavorite()}}>+ Favorite</Button>)
              }
              </Col>
            </Row>                       
          </Card.Body>      
      </Card>
      <MySuccessModal
      size="sm"
      show={modalShow}
      onHide={() => setModalShow(false)}
      />
    </>
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
  isFavourite: PropTypes.bool.isRequired,
	onToggleFavourite: PropTypes.func.isRequired,
};

export default MovieCard
