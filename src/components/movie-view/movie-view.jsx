import React from 'react';
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal(props) {  
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
          {props.show}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const MovieView = ({movies}) => {    
  const { movieid } = useParams();
  const [modalShow, setModalShow] = useState(false);  

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
        //alert("Added To Favorites");                
        setModalShow("Added To Favorites");
        (true);
      } else {
        //alert("Failed To Add To Favorites");
        setModalShow("Failed To Add To Favorites")
      }
    });
  };

  return (   
    <>
      <Card className='mt-4 bg-dark text-white'  style={{ width: '42rem', height: '36rem' }}>          
            <Card.Header className="text-center bg-warning rounded-pill" style={{fontSize:"32px", marginTop:'50px'}}>{movie.title}</Card.Header>  
            <Row style={{marginTop:'60px'}}>
                <Col>
                <div className='d-flex flex-column'>
                  <div className='d-flex justify-content-center'>
                    <Card.Img variant="top" src={movie.image} style={{minHeigh:"200px" , width:"50%"}} className='mt-2'/>                                                     
                  </div>                                             
                </div>          
                </Col>   
              <Col>
                <Card.Body>           
                  <Card.Text><strong>Plot: </strong> <span className='text-capitalize'>{movie.description}</span></Card.Text>
                  <Card.Text><strong>Genre Name:</strong> {movie.genre.name}</Card.Text>
                  <Card.Text><strong>Director Name:</strong> {movie.director.name}</Card.Text>                                            
                </Card.Body>
              </Col>   
            </Row>                                           
      </Card>    
      <div className='d-flex justify-content-end'>
        <Link to="/movies">
          <Button className='button mt-4' >Back</Button>     
        </Link>     
      </div>
      <MyVerticallyCenteredModal
      size="sm"
      show={modalShow}
      onHide={() => setModalShow(false)}
      />
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
