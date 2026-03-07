import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FilmDetailPage from '../pages/FilmDetailPage';
import * as filmAPI from '../api/api';
import * as reviewAPI from '../api/api';

jest.mock('../api/api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ filmId: 'film-123' })
}));

describe('FilmDetailPage Component', () => {
  const mockFilm = {
    _id: 'film-123',
    title: 'The Great Cinema',
    description: 'A description of the great film',
    director: 'Steven Director',
    cast: ['Actor 1', 'Actor 2'],
    genre: ['Drama', 'Action'],
    duration: 120,
    releaseYear: 2023,
    views: 1000,
    averageRating: 8.5,
    poster: 'http://example.com/poster.jpg'
  };

  const mockReviews = [
    {
      _id: 'review-1',
      rating: 9,
      comment: 'Amazing film!',
      user: { firstName: 'John', lastName: 'Doe' }
    },
    {
      _id: 'review-2',
      rating: 8,
      comment: 'Very good',
      user: { firstName: 'Jane', lastName: 'Smith' }
    }
  ];

  beforeEach(() => {
    filmAPI.filmAPI.getFilm.mockResolvedValue({ data: { film: mockFilm } });
    reviewAPI.reviewAPI.getFilmReviews.mockResolvedValue({ data: { reviews: mockReviews } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders film details', async () => {
    render(
      <Router>
        <FilmDetailPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('The Great Cinema')).toBeInTheDocument();
      expect(screen.getByText('A description of the great film')).toBeInTheDocument();
      expect(screen.getByText(/Steven Director/)).toBeInTheDocument();
    });
  });

  test('displays film metadata', async () => {
    render(
      <Router>
        <FilmDetailPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('2023 • Steven Director • 120 min')).toBeInTheDocument();
      expect(screen.getByText(/8.5\/10/)).toBeInTheDocument();
    });
  });

  test('displays film reviews', async () => {
    render(
      <Router>
        <FilmDetailPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Amazing film!')).toBeInTheDocument();
      expect(screen.getByText('Very good')).toBeInTheDocument();
    });
  });

  test('displays review count', async () => {
    render(
      <Router>
        <FilmDetailPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/2 reviews/)).toBeInTheDocument();
    });
  });

  test('displays no reviews message when empty', async () => {
    reviewAPI.reviewAPI.getFilmReviews.mockResolvedValue({ data: { reviews: [] } });

    render(
      <Router>
        <FilmDetailPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('No reviews yet. Be the first to review!')).toBeInTheDocument();
    });
  });

  test('displays error message on film fetch failure', async () => {
    const errorMessage = 'Error loading film';
    filmAPI.filmAPI.getFilm.mockRejectedValueOnce({
      response: { data: { message: errorMessage } }
    });

    render(
      <Router>
        <FilmDetailPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('displays loading state initially', () => {
    render(
      <Router>
        <FilmDetailPage />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
