import axios from 'axios';
import { useState, useEffect } from 'react';

function Filmes() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const ApiKey = '935f652046d51d0ca0b16edcbdbbb106';

  useEffect(() => {
    const genreId = selectedGenre ? `&with_genres=${selectedGenre}` : '';
    const yearParam = selectedYear ? `&year=${selectedYear}` : '';
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}${genreId}${yearParam}`
      )
      .then(response => {
        setMovies(response.data.results);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [selectedGenre, selectedYear]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${ApiKey}`)
      .then(response => {
        setGenres(response.data.genres);
      })
      .catch(error => {
        console.log(error);
      });
  }, [selectedGenre]);

  const filteredMovies = movies.filter(movie => {
    if (selectedGenre && !movie.genre_ids.includes(parseInt(selectedGenre))) {
      return false;
    }
    if (selectedYear && movie.release_date.substring(0, 4) !== selectedYear) {
      return false;
    }
    return true;
  });

  const movieList = movies;
  const slicedMovies = filteredMovies;

  return (
    <div className="">
      <div className="m-4">
        <select
          className="mr-2"
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
        >
          <option value="">Todos os Gêneros</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
        >
          <option value="">Todos os Anos</option>
          {[
            ...new Set(
              movieList.map(dataMovie => dataMovie.release_date.substring(0, 4))
            ),
          ].map(year => (
            <option value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="flex  flex-wrap gap-4">
        {slicedMovies.map(movie => (
          <div className="w-40" key={movie.id}>
            <div className="max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img
                className="w-15"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
              />
              {console.log(movie.original_title)}
              <div className="flex">
                <p className="text-white">{movie.original_title}</p>
                <p className="bg-white rounded-sm">{movie.vote_average}</p>
              </div>
              {/* <p>{movie.overview}</p> 
              <a
                href={`https://api.themoviedb.org/3/movie/603/external_ids?api_key=${ApiKey}`}
              >
                Link para o FIlme
              </a>*/}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filmes;
