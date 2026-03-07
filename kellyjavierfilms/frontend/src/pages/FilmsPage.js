import React, { useState, useEffect } from 'react';
import { filmAPI } from '../api/api';
import './FilmsPage.css';

const FilmsPage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [genre, setGenre] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Science Fiction', 'Romance', 'Animation', 'Documentary', 'Thriller', 'Fantasy'];

  useEffect(() => {
    fetchFilms();
  }, [genre, search, page]);

  const fetchFilms = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await filmAPI.getAllFilms({
        genre,
        search,
        page,
        limit: 12
      });

      setFilms(response.data.films);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching films');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="films-page">
      <div className="films-header">
        <h1>Browse Films</h1>
        <p>Discover great films from around the world</p>
      </div>

      <div className="films-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search films..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="genre-filter">
          <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Genres</option>
            {GENRES.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading films...</div>
      ) : films.length > 0 ? (
        <div className="films-grid">
          {films.map(film => (
            <div key={film._id} className="film-card">
              <div className="film-poster">
                <img src={film.poster} alt={film.title} />
                <div className="film-rating">{film.averageRating.toFixed(1)}/10</div>
              </div>
              <div className="film-info">
                <h3>{film.title}</h3>
                <p className="film-year">{film.releaseYear}</p>
                <p className="film-genres">{film.genre.join(', ')}</p>
                <p className="film-director">by {film.director}</p>
                <button className="watch-btn">Watch Now</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-films">No films found</div>
      )}
    </div>
  );
};

export default FilmsPage;
