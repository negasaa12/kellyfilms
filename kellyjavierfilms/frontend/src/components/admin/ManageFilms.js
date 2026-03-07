import React, { useState, useEffect } from 'react';
import { filmAPI } from '../../api/api';
import './ManageFilms.css';

const ManageFilms = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: [],
    releaseYear: new Date().getFullYear(),
    director: '',
    cast: '',
    duration: '',
    poster: '',
    streamUrl: '',
    price: 0
  });

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const response = await filmAPI.getAllFilms();
      setFilms(response.data.films || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch films');
      console.error('Error fetching films:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'genre') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          genre: [...prev.genre, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          genre: prev.genre.filter(g => g !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const submitData = {
        ...formData,
        cast: formData.cast ? formData.cast.split(',').map(c => c.trim()) : [],
        duration: parseInt(formData.duration)
      };

      if (editingId) {
        await filmAPI.updateFilm(editingId, submitData);
        setError('');
        alert('Film updated successfully');
      } else {
        await filmAPI.createFilm(submitData);
        setError('');
        alert('Film added successfully');
      }

      resetForm();
      fetchFilms();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save film');
      console.error('Error saving film:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (film) => {
    setFormData({
      title: film.title,
      description: film.description,
      genre: film.genre,
      releaseYear: film.releaseYear,
      director: film.director,
      cast: film.cast ? film.cast.join(', ') : '',
      duration: film.duration,
      poster: film.poster,
      streamUrl: film.streamUrl,
      price: film.price
    });
    setEditingId(film._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this film?')) {
      try {
        await filmAPI.deleteFilm(id);
        setError('');
        alert('Film deleted successfully');
        fetchFilms();
      } catch (err) {
        setError('Failed to delete film');
        console.error('Error deleting film:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      genre: [],
      releaseYear: new Date().getFullYear(),
      director: '',
      cast: '',
      duration: '',
      poster: '',
      streamUrl: '',
      price: 0
    });
    setEditingId(null);
    setShowForm(false);
  };

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Science Fiction', 'Romance', 'Animation', 'Documentary', 'Thriller', 'Fantasy'];

  return (
    <div className="manage-films">
      <div className="films-header">
        <h2>🎬 Manage Films</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add New Film'}
        </button>
      </div>

      {error && <div className="error-alert">{error}</div>}

      {showForm && (
        <form className="film-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>{editingId ? 'Edit Film' : 'Add New Film'}</h3>
            
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Film title"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Film description"
                rows={4}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Director</label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleInputChange}
                  required
                  placeholder="Director name"
                />
              </div>

              <div className="form-group">
                <label>Release Year</label>
                <input
                  type="number"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  placeholder="120"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cast (comma-separated)</label>
                <input
                  type="text"
                  name="cast"
                  value={formData.cast}
                  onChange={handleInputChange}
                  placeholder="Actor 1, Actor 2, Actor 3"
                />
              </div>

              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Genres</label>
              <div className="genre-checkboxes">
                {genres.map(genre => (
                  <label key={genre} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="genre"
                      value={genre}
                      checked={formData.genre.includes(genre)}
                      onChange={handleInputChange}
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Poster URL</label>
                <input
                  type="url"
                  name="poster"
                  value={formData.poster}
                  onChange={handleInputChange}
                  placeholder="https://example.com/poster.jpg"
                />
              </div>

              <div className="form-group">
                <label>Stream URL</label>
                <input
                  type="url"
                  name="streamUrl"
                  value={formData.streamUrl}
                  onChange={handleInputChange}
                  required
                  placeholder="https://example.com/stream"
                />
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Saving...' : editingId ? 'Update Film' : 'Add Film'}
              </button>
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {loading && !showForm ? (
        <div className="loading">Loading films...</div>
      ) : films.length === 0 ? (
        <div className="empty-state">
          <p>No films yet. Add your first film to get started!</p>
        </div>
      ) : (
        <div className="films-grid">
          {films.map(film => (
            <div key={film._id} className="film-card">
              {film.poster && (
                <img src={film.poster} alt={film.title} className="film-poster" />
              )}
              <div className="film-info">
                <h3>{film.title}</h3>
                <p className="director">Director: {film.director}</p>
                <p className="year">{film.releaseYear}</p>
                <p className="genres">{film.genre?.join(', ')}</p>
                <div className="film-actions">
                  <button className="edit-btn" onClick={() => handleEdit(film)}>
                    ✏️ Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(film._id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageFilms;
