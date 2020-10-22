import * as React from 'react';
import { DeleteMovieWindow } from '../components/DeleteMovie/DeleteMovie';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('<DeleteMovieWindow />', () => {
  let onShowDeleteMovieWindow;
  let onConfirmDeleteMovie;

  beforeEach(() => {
    onShowDeleteMovieWindow = jest.fn();
    onConfirmDeleteMovie = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('render a Delete Movie Component', async () => {
    const { asFragment } = render(
      <DeleteMovieWindow
        showDeleteMovieModal={true}
        movieId={1234}
        onShowDeleteMovieWindow={null}
        onConfirmDeleteMovie={null}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render the component at all', async () => {
    const { container } = render(
      <DeleteMovieWindow
        showDeleteMovieModal={false}
        movieId={1234}
        onShowDeleteMovieWindow={null}
        onConfirmDeleteMovie={null}
      />
    );

    const elements = container.firstChild;

    expect(elements).toBeNull();
  });

  it('should close add movie window when click close icon', async () => {
    const { getByTestId, getByText } = render(
      <DeleteMovieWindow
        showDeleteMovieModal={true}
        movieId={1234}
        onShowDeleteMovieWindow={onShowDeleteMovieWindow}
        onConfirmDeleteMovie={null}
      />
    );
    const button = getByTestId('delete-movie-close');

    userEvent.click(button);

    expect(getByText('Delete movie')).toBeInTheDocument();
    await waitFor(() => {
      expect(onShowDeleteMovieWindow).toHaveBeenCalled();
    });
  });

  it('should call delete movie method when submit button is clicked', async () => {
    const movieId = 1234;
    const { getByTestId, getByText } = render(
      <DeleteMovieWindow
        showDeleteMovieModal={true}
        movieId={movieId}
        onShowDeleteMovieWindow={onShowDeleteMovieWindow}
        onConfirmDeleteMovie={onConfirmDeleteMovie}
      />
    );
    const button = getByText('Confirm');

    userEvent.click(button);

    expect(getByText('Delete movie')).toBeInTheDocument();
    await waitFor(() => {
      expect(onConfirmDeleteMovie).toHaveBeenCalledWith(movieId);
    });
  });
});
