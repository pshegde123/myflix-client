import React, { useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

const MainView = () => {
    const [ movies, setMovies] = useState([
        { 
            id: 1, 
            title:"Inception",
            description:"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
            image:"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
            genre:{
                name:"Action",
                description:"A genre that emphasizes physical feats, including hand-to-hand combat, chases, and explosions."
            },
            director:{
                name:"James Cameron",
                bio:"James Cameron is a Canadian filmmaker, director, producer, screenwriter, and deep-sea explorer.",
                birth_date:"1954-08-16T00:00:00.000+00:00",
                death_date:null
            }
        },
        { 
            id: 2,
            title:"The Dark Knight",
            description:"When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
            image:"https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
            genre:{
                name:"Action",
                description:"A genre that emphasizes physical feats, including hand-to-hand combat, chases, and explosions."
            },
            director:{
                name:"Christopher Nolan",
                bio:"Christopher Nolan is a British-American film director, screenwriter, and producer.",
                birth_date:"1970-07-30T00:00:00.000+00:00",
                death_date:null
            }
        },
        { 
            id: 3,
            title:"The Godfather",
            description:"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            image:"https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
            genre:{
                name:"Crime",
                description:"A genre that centers on criminal acts and the moral and legal repercussions they entail"
            },
            director:{
                name:"Francis Ford Coppola",
                bio:"Francis Ford Coppola is an American film director, producer, and screenwriter.",
                birth_date:"1939-04-07T00:00:00.000+00:00",
                death_date:null
            }
        }
    ]);    
    const [selectedMovie, setSelectedMovie] = useState(null);
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
