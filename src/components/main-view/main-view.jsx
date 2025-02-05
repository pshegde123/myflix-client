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
import { NavigationBar } from '../navigation-bar/navigation-bar';

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
          <NavigationBar user={user} onLoggedOut={() => {
            setUser(null); 
            setToken(null);
            localStorage.clear();
            window.location.href = "/login"; 
            } } />
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
                </Col>
                )               
                }                                
              </>                   
            }/>        
             <Route path="/signup" element={   
                <>                
                  <Col md={5}>
                    <SignupView/>               
                  </Col>            

              </>                   
            }/>          
            <Route path="/movies" element={
               <div>                
                <Row className='mt-4'>
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
                <MovieView movies={movies}/>              
              </>
            }/>               
          </Routes>          
        </Row>
      </BrowserRouter>
     )
}

export default MainView
