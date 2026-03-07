import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FilmsPage from '../pages/FilmsPage';
import * as filmAPI from '../api/api';

jest.mock('../api/api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ filmId: 'test-film-123' })
}));

describe('FilmsPage Component', () => {
  const mockFilms = [
    {
      _id: '1',
      title: 'Test Film 1',
      poster: 'http://example.com/poster1.jpg',
      averageRating: 8.5,
      releaseYear: 2023,
      genre: ['Action', 'Drama'],
      director: 'Test Director 1'
    },
    {
      _id: '2',
      title: 'Test Film 2',
      poster: 'http://example.com/poster2.jpg',
      averageRating: 7.2,
      releaseYear: 2022,
      genre: ['Comedy'],
      director: 'Test Director 2'
    }
  ];

  beforeEach(() => {
    filmAPI.filmAPI.getAllFilms.mockResolvedValue({ data: { films: mockFilms } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders films page title', async () => {
    render(
      <Router>
        <FilmsPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Browse Films')).toBeInTheDocument();
    });
  });

  test('displays films from API', async () => {
    render(
      <Router>
        <FilmsPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Film 1')).toBeInTheDocument();
      expect(screen.getByText('Test Film 2')).toBeInTheDocument();
    });
  });

  test('filters films by genre', async () => {
    render(
      <Router>
        <FilmsPage />
      </Router>
    );

    const genreSelect = screen.getByDisplayValue('All Genres');
    fireEvent.change(genreSelect, { target: { value: 'Action' } });

    await waitFor(() => {
      expect(filmAPI.filmAPI.getAllFilms).toHaveBeenCalledWith(
        expect.objectContaining({ genre: 'Action' })
      );
    });
  });

  test('searches films by title', async () => {
    render(
      <Router>
        <FilmsPage />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText('Search films...');
    fireEvent.change(searchInput, { target: { value: 'Test' } });

    await waitFor(() => {
      expect(filmAPI.filmAPI.getAllFilms).toHaveBeenCalledWith(
        expect.objectContaining({ search: 'Test' })
      );
    });
  });

  test('displays error message on API failure', async () => {
    const errorMessage = 'Error fetching films';
    filmAPI.filmAPI.getAllFilms.mockRejectedValueOnce({
      response: { data: { message: errorMessage } }
    });

    render(
      <Router>
        <FilmsPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('displays loading state initially', () => {
    render(
      <Router>
        <FilmsPage />
      </Router>
    );

    expect(screen.getByText('Loading films...')).toBeInTheDocument();
  });
});
