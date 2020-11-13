import * as React from 'react';
import './ResultsMovie.scss';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IMovieData } from '../../interfaces/IMovieData';
import { DetailsMovie } from '../DetailsMovie/DetailsMovie';
import { RootState } from '../../store/index';
import { loadMovies } from './thunks';
import { getMoviesLoading, getMoviesData } from './selectors';
import {
  saveMovie,
  selectedMovie,
  deleteSelectedMovie,
} from '../AddMovie/thunks';
import { AddMovieWindow } from '../AddMovieWindow/AddMovieWindow';
import clasificationTypes from '../../data/clasifications.json';
import { DeleteMovieWindow } from '../DeleteMovie/DeleteMovie';

const mapStateToProps = (state: RootState) => ({
  movie: state.movie.movie,
  movies: getMoviesData(state),
  isLoading: getMoviesLoading(state),
  errorMessage: state.movie.errorMessage,
  genre: state.movie.genre,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>,
) => {
  return {
    startLoadingMovies: () => dispatch(loadMovies()),
    updateMovie: (movie: IMovieData) => dispatch(saveMovie(movie)),
    selectMovie: (movie: IMovieData) => dispatch(selectedMovie(movie)),
    deleteMovie: (id: number) => dispatch(deleteSelectedMovie(id)),
  };
};

/* eslint-disable */
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
/* eslint-enable */

const ResultsMovie: React.FunctionComponent<Props> = ({
  movie,
  movies,
  startLoadingMovies,
  updateMovie,
  selectMovie,
  deleteMovie,
  isLoading,
  genre,
}) => {
  /* eslint-disable */
  const [showAddMovieModal, setShowAddMovieModal] = React.useState<boolean>(
    false,
  );
  /* eslint-enable */

  /* eslint-disable */
  const [showDeleteMovieModal, setShowDeleteMovieModal] = React.useState<
    boolean
  >(false);
  /* eslint-enable */

  const handleShowDeleteMovieWindow = React.useCallback(() => {
    setShowDeleteMovieModal(!showDeleteMovieModal);
  }, [showDeleteMovieModal]);

  const handleShowAddMovieWindow = React.useCallback(() => {
    setShowAddMovieModal(!showAddMovieModal);
  }, [showAddMovieModal]);

  React.useEffect(() => {
    startLoadingMovies();
  }, []);

  const loadingMessage = <div>Loading movies...</div>;

  const handleEditMovie = function editMovieFunc(movieDetails: IMovieData) {
    setShowAddMovieModal(!showAddMovieModal);
    selectMovie(movieDetails);
  };

  const handleDeleteMovie = function deleteMovieFunc(movieDetails: IMovieData) {
    setShowDeleteMovieModal(!showDeleteMovieModal);
    selectMovie(movieDetails);
  };

  const handleUpdateMovie = function updateMovieFunc(movieDetails: IMovieData) {
    updateMovie(movieDetails);
  };

  const handleDeleteSelectedMovie = function deleteSelectedMovieFunc(
    id: number,
  ) {
    deleteMovie(id);
  };

  const content = (
    <>
      <AddMovieWindow
        clasificationMovies={clasificationTypes}
        showModal={showAddMovieModal}
        movie={movie}
        onShowAddMovieWindow={handleShowAddMovieWindow}
        onAddMovieSubmit={handleUpdateMovie}
      />
      <DeleteMovieWindow
        movieId={movie?.id}
        showDeleteMovieModal={showDeleteMovieModal}
        onShowDeleteMovieWindow={handleShowDeleteMovieWindow}
        onConfirmDeleteMovie={handleDeleteSelectedMovie}
      />
      <div className="list-movies">
        <div className="total-result">
          <span className="found-label">
            <b>{movies.length}</b> movies found {genre}
          </span>
        </div>
        <div className="display-movie">
          {movies.map((movieDetails: IMovieData) => (
            <DetailsMovie
              key={movieDetails.id}
              movie={movieDetails}
              onEditMovie={handleEditMovie}
              onDeleteMovie={handleDeleteMovie}
            />
          ))}
        </div>
      </div>
    </>
  );

  return isLoading ? loadingMessage : content;
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsMovie);
