import React, { useState,useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

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

      if (!user) {
        return (
          <>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          or
          <SignupView />
        </>
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
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie)}}/>
        ))}
        <button onClick={() => { setUser(null); setToken(null);localStorage.clear(); }}>Logout</button>
    </div>
  )
}

export default MainView
