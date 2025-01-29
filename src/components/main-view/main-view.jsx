import React, { useState,useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
    
    useEffect(() => {
      if (!token) {
        return;
      }
  
      fetch("https://myflix-ph-1e58a204d843.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);          
            const moviesFromApi = data.map((doc) => {
                return {
                  id: doc._id,
                  title: doc.title,
                  image:doc.image,
                  description: doc.description,
                  genre:{
                    name:doc.genre.name,
                    description:doc.genre.descrition
                  },
                  director:{
                    name:doc.director.name,
                    bio: doc.director.bio,
                    birthdate: doc.director.birth_date,
                    deathdate: doc.director.death_date
                  }                
                };
              });
              setMovies(moviesFromApi); 
        });
    }, [token]);   

      if (!user) {
        return (
          <Row className="justify-content-md-center">
             <Col md={5}>
                <LoginView onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }} />
                <h3 className='mb-4'>OR</h3>
                <SignupView />
             </Col>           
        </Row>
        );
      }
  
    if (selectedMovie){       
       return(<MovieView movie={selectedMovie} onBackClick={()=>{setSelectedMovie(null)}}/>);
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }    
    
  return (    
    <div>
      <Row className='justify-content-center mb-4'>
          <Col/>                    
          <Col/>                    
          <Col/>                    
          <Col>
            <Button onClick={() => { setUser(null); setToken(null);localStorage.clear(); }}>Logout</Button>          
          </Col>                         
      </Row>
      <Row>
        {movies.map((movie) => (            
              <Col key={movie.id} md={4} className="mb-5">
                  <MovieCard  movie={movie} onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie)}}/>
              </Col>                         
        ))}
        </Row>
    </div>
  )
}

export default MainView
