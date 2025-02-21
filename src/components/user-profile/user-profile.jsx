import { useState,useEffect } from "react";
import { Button, Form,Modal } from "react-bootstrap";
import {Card,Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyVerticallyCenteredModal(props) {  
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Success
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>        
        <p>
          User deleted successfully
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const ProfileView = ({ movies,user,setUser}) => {     
  //const localUser = JSON.parse(localStorage.getItem("user")); 
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [userFavs, setUserFavs] = useState([]);   
  const [modalShow, setModalShow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);      

  useEffect(() => {    
    fetch(`https://myflix-ph-1e58a204d843.herokuapp.com/users/${user.Username}`, {     
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())
    .then((data) => {          
        //console.log("data=",data);     

        // Populate favoriteMovies				
				const favoriteMoviesList = movies.filter((movie) =>
					data.FavoriteMovies.some((fav) => String(fav) === String(movie.id))
				);     	       
        setUserFavs(favoriteMoviesList);            
    });  
  },[movies,user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: user.username,
      ...(password && { Password: user.password }),  // Only include the password if it's changed
      Email: user.email,
      Birthday: user.birthday
    };

    fetch(`https://myflix-ph-1e58a204d843.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Profile updated successfully");
        response.json().then((updatedUser) => {               
          setUser(updatedUser);
          // Update localStorage with the new user details
          localStorage.setItem("user", JSON.stringify(updatedUser));
          window.location.reload();  // Optionally reload the page
        });
      } else {
        alert("Profile update failed");
      }
    });
  };  
  const handleDelete = () => {    
    if(window.confirm("Are your sure you want to delete your account? This action cannot be undone.")){      
      const data = {
        Username: username     
      };
  
      fetch(`https://myflix-ph-1e58a204d843.herokuapp.com/users/${user.Username}`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      }).then((response) => {        
        if (response.ok) {          
          //alert("Profile deleted successfully");
          setModalShow(true);
          localStorage.clear();           
          window.location.href = "/login";  
        } else {
          alert("Profile delete failed");
        }
      });  
    }
  };  
  const handleRemoveFromFavorite = (movieid) => {       
    const data = {
      Username: username,            
      Movieid: movieid
    };

    fetch(`https://myflix-ph-1e58a204d843.herokuapp.com/users/${username}/movies/${movieid}`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        fetch(`https://myflix-ph-1e58a204d843.herokuapp.com/users/${user.Username}`, {     
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }).then((response) => (response.json))
        .then((data) =>{          
          //console.log("data = ",data);
          // Populate favoriteMovies				
          const favoriteMoviesList = movies.filter((movie) =>
            user.FavoriteMovies.some((fav) => String(fav) === String(movie.id))
          );               
          setUserFavs(favoriteMoviesList);      
        });        
        alert("Removed From Favorites");                      
        window.location.reload();
      } else {
        alert("Failed To Remove From Favorites");
      }
    });
  }; 
  
  return (            
    <div className="container">
    <Form onSubmit={handleSubmit}>  
    <h3 className="mt-2 bg-secondary text-center p-2">User Details:</h3>     
        <Row>                          
          <Col className="justify-content-center">
            <Form.Group as={Col} md="6" controlId="formUsername">
              <Form.Label className="Display-1">Username:</Form.Label>
              <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="4"
              />
          </Form.Group>         
        <Form.Group as={Col} md="6" controlId="formPassword">
          <Form.Label>Password (leave blank to keep unchanged):</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formBdate">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
      </Col>                     
    </Row>
    <Row className="mt-4">        
        <Col className="md-4">
            <Button variant="primary" type="submit">Update Profile</Button>            
        </Col>        
    </Row>      
    <hr/>  
      <Row className="justify-content-center mb-2">
          <h3 className="mt-2 bg-secondary text-center p-2">Favorite Movies</h3>             
          <div className="favorite-movies">
            <Row>              
                  {userFavs.length > 0 ? (
                  userFavs.map((movie) => (
                    <Col key={movie.id}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}>
                      <Card className='h-100'>
                        <div className='image-container'>
                          <Card.Img
                            variant='top'
                            src={movie.image}
                            alt={movie.title}
                            loading='lazy'
                          />
                        </div>
                        <Card.Body>
                          <Card.Title>
                            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                          </Card.Title>
                        </Card.Body>
                        <Button                        
                          variant='danger'
                          onClick={() => handleRemoveFromFavorite(movie.id)}>-Favorite                     
                        </Button>
                      </Card>                                              
                    </Col>  
                  ))
                  ) : (
                  <p>You have no favorite movies.</p>
                  )}            
            </Row>            
          </div>
      <hr/>
      </Row>
      <div className="mt-4 mb-4">
        <h3 className="mt-2 bg-secondary text-center p-2">User Removal</h3>  
        <Row className="justify-content-center">                                                     
              <Button  variant="danger" className="w-25" onClick={()=>handleDelete()}>Click here to remove user</Button>        
        </Row>        
      </div>    
    </Form>   
    <MyVerticallyCenteredModal
      size="sm"
      show={modalShow}
      onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default ProfileView;