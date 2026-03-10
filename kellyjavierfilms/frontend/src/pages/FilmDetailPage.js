import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { filmAPI } from '../api/api';
import './FilmDetailPage.css';

const FilmDetailPage = () => {
  const { filmId } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFilmDetails();
  }, [filmId]);

  const fetchFilmDetails = async () => {
    try {
      const response = await filmAPI.getFilm(filmId);
      setFilm(response.data.film);
    } catch (error) {
      setError(error.response?.data?.message || 'Error loading film');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!film) return <div className="error-message">Film not found</div>;

  return (
    <div className="film-detail-page">
      <div className="film-hero" style={{ backgroundImage: `url(${film.poster})` }}>
        <div className="film-hero-overlay">
          <div className="film-hero-content">
            <h1>{film.title}</h1>
            <p className="film-meta">
              {film.releaseYear} • {film.director} • {film.duration} min
            </p>
            <button className="watch-button">Watch Now</button>
          </div>
        </div>
      </div>

      <div className="film-content">
        <div className="left-column">
          <div className="film-section">
            <h2>Synopsis</h2>
            <p>{film.description}</p>
          </div>

          <div className="film-section">
            <h3>Details</h3>
            <div className="details-grid">
              <div>
                <span className="label">Director:</span>
                <span>{film.director}</span>
              </div>
              <div>
                <span className="label">Cast:</span>
                <span>{film.cast?.join(', ') || 'N/A'}</span>
              </div>
              <div>
                <span className="label">Genre:</span>
                <span>{film.genre.join(', ')}</span>
              </div>
              <div>
                <span className="label">Duration:</span>
                <span>{film.duration} minutes</span>
              </div>
              <div>
                <span className="label">Year:</span>
                <span>{film.releaseYear}</span>
              </div>
              <div>
                <span className="label">Views:</span>
                <span>{film.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetailPage;
