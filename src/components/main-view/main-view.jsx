import React, { useState,useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

const MainView = () => {
    const [ movies, setMovies] = useState([]);    
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://myflix-ph-1e58a204d843.herokuapp.com/movies")
          .then((response) => {
            //console.log(response);
            return (response.json());
        })
        .then((data) => {
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
      }, []);

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
    </div>
  )
}

export default MainView
