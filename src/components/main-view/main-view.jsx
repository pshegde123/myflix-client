import React, { useState,useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  
    
    useEffect(() => {
      if (!token) {
        return;
      }
  
      fetch("https://myflix-ph-1e58a204d843.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);          
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

     return(
      <BrowserRouter>
        <Row className="justify-content-md-center">
          <Routes>          
            <Route path="/" element={
              <>
                {!user? 
                (
                  <Navigate to="/login" replace />
                ):                                 
                    (<Navigate to="/movies" replace />)                               
              }
              </>
            }/>
            <Route path="/login" element={   
                <>
                { user ? (<Navigate to="/movies" />):
                (                  
                  <Col md={5}>
                  <LoginView onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                  }} />
                  <h3 className='mb-4'>OR</h3>
                  <SignupView />
                </Col>
                )               
                }                                
              </>                   
            }/>          
            <Route path="/movies" element={
               <div>
                <Row className='justify-content-center mb-4'>
                    <Col/>                    
                    <Col/>                    
                    <Col/>                    
                    <Col>    
                      <Link to={`/login`}>
                        <Button onClick={() => { setUser(null); setToken(null);localStorage.clear(); }}>Logout</Button>          
                      </Link>                                    
                    </Col>                         
                </Row>
                <Row>
                  {movies.map((movie) => (            
                        <Col key={movie.id} md={4} className="mb-5">
                            <MovieCard  movie={movie}/>
                        </Col>                         
                  ))}
                  </Row>
             </div>                   
            }/>     
             <Route path="/movies/:movieid" element={
              <>     
              { selectedMovie ?
                (<MovieView movie={selectedMovie}/>) : (<Navigate to="/" replace />)      
              }
              </>
            }/>               
          </Routes>          
        </Row>
      </BrowserRouter>
     )
}

export default MainView
