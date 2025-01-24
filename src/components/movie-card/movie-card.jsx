import React from 'react'

const MovieCard = ({movie,onMovieClick}) => {  
  const buttonStyle = {
    backgroundColor: 'grey',    
    color:'white',
    textAlign:'center',
    width:'20%',
    padding: '5px',    
    margin:'auto'
  };
  return (
    <div className='card' onClick={()=>{onMovieClick(movie)}} >
        <div className='card-body'>
            {movie.title}
        </div>      
    </div>
  )
}

export default MovieCard
