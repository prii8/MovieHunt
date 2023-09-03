
import { useEffect, useState } from 'react';
import './App.css';
import "./Card"
import SearchIcon from "./search.svg";
import Card from './Card';
const API_URL='http://www.omdbapi.com/?apikey=3c088058';

const movie1=
  {
    "Title": "Spiderman",
    "Year": "1990",
    "imdbID": "tt0100669",
    "Type": "movie",
    "Poster": "N/A"
}


function App() {

  const [movie,setmovie]=useState([]);
  const search= async (title) =>
  {
    const response= await fetch(`${API_URL}&s=${title}`)
    const data=await response.json();

    console.log(data.Search);
    setmovie(data.Search);
  };

 
  useEffect(()=>{
    search('Avengers')
  }, []);


  const[searchTerm,setSerchTerm]=useState("");

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search(searchTerm)
    }
  }

  return (
    <div className="App">
      <h1>MovieHuntOnline</h1>

      <div className='search'>
        <input
        placeholder='Search for movies'
        value={searchTerm}
        onKeyDown={handleKeyDown}
        onChange={(e)=> {setSerchTerm(e.target.value);
        }}
        ></input>
        <img src={SearchIcon}
        alt='search'
        onClick={()=> search(searchTerm)}></img>
      </div>

      {movie?.length > 0 ? (
        <div className="container">
          {movie.map((m) => (
            <Card movie={m} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      
    </div>
  );
}

export default App;

