import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FilmeFilter() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY')
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get('https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY')
      .then(response => {
        setGenres(response.data.genres);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleGenreChange = e => {
    setSelectedGenre(e.target.value);
  };

  const filteredMovies = selectedGenre
    ? movies.filter(movie => movie.genre_ids.includes(Number(selectedGenre)))
    : movies;

  return (
    <div>
      <h1>Lista de Filmes</h1>
      <div>
        <label htmlFor="genre-select">Gênero:</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">Todos</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredMovies.map(movie => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Gênero: {movie.genre_ids.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilmeFilter;
