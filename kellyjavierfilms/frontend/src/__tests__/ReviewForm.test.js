import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReviewForm from '../components/ReviewForm';
import * as reviewAPI from '../api/api';
import { AuthContext } from '../context/AuthContext';

jest.mock('../api/api');

describe('ReviewForm Component', () => {
  const mockUser = {
    _id: 'user-123',
    firstName: 'John',
    lastName: 'Doe'
  };

  const mockAuthContext = {
    user: mockUser,
    isAuthenticated: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders review form when user is logged in', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ReviewForm filmId="film-123" onReviewSubmitted={jest.fn()} />
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText('Rating')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Review')).toBeInTheDocument();
    expect(screen.getByText('Post Review')).toBeInTheDocument();
  });

  test('shows login prompt when user is not logged in', () => {
    const contextWithoutUser = { ...mockAuthContext, user: null };

    render(
      <AuthContext.Provider value={contextWithoutUser}>
        <ReviewForm filmId="film-123" onReviewSubmitted={jest.fn()} />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Please log in to leave a review')).toBeInTheDocument();
  });

  test('updates rating when rating button is clicked', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ReviewForm filmId="film-123" onReviewSubmitted={jest.fn()} />
      </AuthContext.Provider>
    );

    const ratingButtons = screen.getAllByRole('button').filter(btn => btn.className.includes('rating-btn'));
    fireEvent.click(ratingButtons[8]); // Click on 9

    expect(ratingButtons[8]).toHaveClass('active');
  });

  test('updates comment text when textarea is changed', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ReviewForm filmId="film-123" onReviewSubmitted={jest.fn()} />
      </AuthContext.Provider>
    );

    const textarea = screen.getByPlaceholderText('Share your thoughts about this film...');
    fireEvent.change(textarea, { target: { value: 'This is a great film!' } });

    expect(textarea.value).toBe('This is a great film!');
  });

  test('submits review with correct data', async () => {
    reviewAPI.reviewAPI.createReview.mockResolvedValueOnce({});
    const onReviewSubmitted = jest.fn();

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ReviewForm filmId="film-123" onReviewSubmitted={onReviewSubmitted} />
      </AuthContext.Provider>
    );

    const ratingButtons = screen.getAllByRole('button').filter(btn => btn.className.includes('rating-btn'));
    fireEvent.click(ratingButtons[7]); // Click on 8

    const textarea = screen.getByPlaceholderText('Share your thoughts about this film...');
    fireEvent.change(textarea, { target: { value: 'Excellent film!' } });

    const submitBtn = screen.getByText('Post Review');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(reviewAPI.reviewAPI.createReview).toHaveBeenCalledWith({
        film: 'film-123',
        rating: 8,
        comment: 'Excellent film!'
      });
      expect(onReviewSubmitted).toHaveBeenCalled();
    });
  });

  test('shows error message on submission failure', async () => {
    const errorMessage = 'Error posting review';
    reviewAPI.reviewAPI.createReview.mockRejectedValueOnce({
      response: { data: { message: errorMessage } }
    });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ReviewForm filmId="film-123" onReviewSubmitted={jest.fn()} />
      </AuthContext.Provider>
    );

    const textarea = screen.getByPlaceholderText('Share your thoughts about this film...');
    fireEvent.change(textarea, { target: { value: 'Test' } });

    const submitBtn = screen.getByText('Post Review');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('disables submit button while loading', async () => {
    reviewAPI.reviewAPI.createReview.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(resolve, 1000))
    );

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ReviewForm filmId="film-123" onReviewSubmitted={jest.fn()} />
      </AuthContext.Provider>
    );

    const textarea = screen.getByPlaceholderText('Share your thoughts about this film...');
    fireEvent.change(textarea, { target: { value: 'Test' } });

    const submitBtn = screen.getByText('Post Review');
    fireEvent.click(submitBtn);

    expect(submitBtn).toBeDisabled();
    expect(screen.getByText('Posting...')).toBeInTheDocument();
  });

  test('displays character count', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ReviewForm filmId="film-123" onReviewSubmitted={jest.fn()} />
      </AuthContext.Provider>
    );

    expect(screen.getByText('0/500')).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText('Share your thoughts about this film...');
    fireEvent.change(textarea, { target: { value: 'Test comment' } });

    expect(screen.getByText('12/500')).toBeInTheDocument();
  });
});
