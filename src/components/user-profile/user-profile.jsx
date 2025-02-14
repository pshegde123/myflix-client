import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ProfileView = ({ movies }) => {
  const localUser = JSON.parse(localStorage.getItem("user"));

  const favMovies = movies.filter((movie) => {
    //console.log(movie);
    //console.log(localUser);
    return localUser.FavoriteMovies.includes(movie.id);
  });

  const [username, setUsername] = useState(localUser.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(localUser.Email || "");
  const [birthday, setBirthday] = useState(localUser.Birthday || "01/01/0001");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      ...(password && { Password: password }),  // Only include the password if it's changed
      Email: email,
      Birthday: birthday
    };

    fetch(`https://myflix-ph-1e58a204d843.herokuapp.com/users/${localUser.Username}`, {
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
  
      fetch(`https://myflix-ph-1e58a204d843.herokuapp.com/users/${localUser.Username}`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      }).then((response) => {        
        if (response.ok) {          
          alert("Profile deleted successfully");
          localStorage.clear();           
          window.location.href = "/login";  
        } else {
          alert("Profile delete failed");
        }
      });  
    }
  };

  const handleRemoveFromFavorite = (movieid) => {   
    console.log("movieid = ",movieid);

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
                {favMovies.length > 0 ? (
                favMovies.map((movie) => (
                  <Col md={4} key={movie.id}>
                    <MovieCard key={movie.id} movie={movie} />                    
                    <Button key={movie._id} size="sm" className="mt-2" onClick={() => {handleRemoveFromFavorite(movie.id)}}> Remove From Favorite</Button>                    
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
              <Button  variant="danger" className="w-50" onClick={handleDelete}>Click here to remove user</Button>        
        </Row>        
      </div>    
    </Form>
    </div>
  );
};

export default ProfileView;