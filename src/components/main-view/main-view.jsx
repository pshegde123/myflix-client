import React, { useState,useEffect, use } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import ProfileView from '../user-profile/user-profile';
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
  const [favorites, setFavorites]=useState([]);
  const [searchVal, setSearchVal] = useState('');

    useEffect(() => {
      if (!token || !user) {
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

              // Fetch favourites
              const favoritesResponse = fetch(
                `https://myflix-ph-1e58a204d843.herokuapp.com/users/${user.Username}`,
                {
                  headers: {
                    Authorization: `Bearer ${storedToken}`,
                    'Content-Type': 'application/json',
                  },
                }
              ).then((response) => response.json())
              .then((data) => {                
                //console.log(data);
                const favoritesData = data;               
                const favoritesList = Array.isArray(data.FavoriteMovies)
                ? data.FavoriteMovies
                : [];
                //console.log("favoritesList = ",favoritesList);
                setFavorites(Array.isArray(favoritesList) ? favoritesList : []);                
              })              
              setMovies(moviesFromApi);                             
        });
    }, [token, user]);   
    
    const handleInput = (e) => {
      setSearchVal(e.target.value);      
    }

    const handleClearBtn = () => {
      setSearchVal('');
    }

    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchVal.toLowerCase())
    );

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
                  <Col md={4}/>
                  <Col md={4} style={{display:'flex'}}>                  
                      <input   
                      onChange={handleInput}         
                      className='rounded-pill '         
                      value={searchVal}
                      type="text" 
                      name="movie-search" 
                      id="movie-search" 
                      placeholder="Search Movies"
                      style={{width:'100%',height:'40px'}}
                    />                            
                    <Button size="sm" className='rounded-pill' onClick={() => handleClearBtn()}>Clear</Button>            
                  </Col>
                  <Col md={4}/>
                </Row>            
                <Row className='mt-4'>                         
                    <>
                      {filteredMovies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={4}>
                          <MovieCard 
                            movie={movie}  
                            user={user}
                            isFavorite = {                                                    
                              favorites.some((fav) => {                                    
                                return (fav.toString() === movie.id.toString()?true:false);                               
                              })}                                      
                          />
                        </Col>  
                      ))}                                      
                    </>
                  </Row>
             </div>                   
            }/>     
             <Route path="/movies/:movieid" element={
              <>                   
                <MovieView movies={movies}/>              
              </>
            }/>         
             <Route path="/users/:userid" element={
              <>                   
                <ProfileView movies={movies} user={user} setUser={setUser}/>              
              </>
            }/>                            
          </Routes>          
        </Row>        
      </BrowserRouter>
     )
}

export default MainView
