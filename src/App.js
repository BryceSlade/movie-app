import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import './app.css';

function App() {
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'
  const API_URL = 'https://api.themoviedb.org/3'
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [selectedMovie, setSelectedMovie] = useState({})

  const getMovies = (searchKey) => {
    const type = searchKey ? 'search' : 'discover'
    axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: '0ef14fb15ebf8738272817a78a6fe9e1',
        query: searchKey
      }
    })
    .then(res => {
      setMovies(res.data.results)
      setSelectedMovie(res.data.results[0])
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getMovies()
    // console.log(movies)
  }, [])

  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie}
        selectMovie={setSelectedMovie}
      />
    ))
  )

  const searchMovies = (e) => {
    e.preventDefault()
    getMovies(searchKey)
  }
  

  return (
    <div className="App">
      <header className='header'>
        <div className='header-content max-center'>
          <span>Movie Trailer App</span>
          <form onSubmit={searchMovies}>
            <input 
              type='text' 
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button type='submit'>Search!</button>
          </form>
        </div>
      </header>
        <div className='hero' style={{backgroundImage:`url('${IMAGE_PATH}${selectedMovie.backdrop_path}')`}}>
          <div className='hero-content max-center'>
            <button className='button'>Play Trailer</button>
            <h1 className='hero-title'>{selectedMovie.title}</h1>
            {selectedMovie.overview ? <p className='hero-overview'>{selectedMovie.overview}</p> : null}
          </div>
        </div>
        <div className='container max-center'>
          {renderMovies()}
        </div>
    </div>
  );
}

export default App;