import * as React from 'react';
import './AddMovie.scss';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AddMovieWindow } from '../AddMovieWindow/AddMovieWindow';
import clasificationTypes from '../../data/clasifications.json';
import { IMovieData } from '../../interfaces/IMovieData';
import { Button } from '../Button/Button';

import { RootState } from '../../store/index';
import { saveMovie, selectedMovie } from './thunks';

const mapStateToProps = (state: RootState) => ({
  movie: state.movie.movie,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>,
) => {
  return {
    addNewMovie: (movie: IMovieData) => dispatch(saveMovie(movie)),
    selectMovie: () => dispatch(selectedMovie(null)),
  };
};

/* eslint-disable */
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
/* eslint-enable */

const AddMovie: React.FunctionComponent<Props> = ({
  movie,
  addNewMovie,
  selectMovie,
}) => {
  const [showAddMovieModal, setShowAddMovieModal] = React.useState<boolean>(
    false,
  );

  // PATTERN: Event Handlers
  const handleShowAddMovieWindow = React.useCallback(() => {
    selectMovie();
    setShowAddMovieModal(!showAddMovieModal);
  }, [showAddMovieModal]);

  const handleSubmitAddMovie = function submitAddMovieFunc(
    movieToSave: IMovieData,
  ) {
    addNewMovie(movieToSave);
  };

  return (
    <>
      <div className="add-movie col-2">
        <Button
          buttonType="btn-add-movie"
          label="+Add Movie"
          onClick={handleShowAddMovieWindow}
        />
      </div>
      <AddMovieWindow
        clasificationMovies={clasificationTypes}
        showModal={showAddMovieModal}
        movie={movie}
        onShowAddMovieWindow={handleShowAddMovieWindow}
        onAddMovieSubmit={handleSubmitAddMovie}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);
