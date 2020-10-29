import * as React from 'react';
//import './AddMovie.scss';
import { AddMovieWindow } from '../AddMovieWindow/AddMovieWindow';
import clasificationTypes from '../../data/clasifications.json';
import { IMovieData } from '../../interfaces/IMovieData';
import { IClasification } from '../../interfaces/IClasificationMovie';
import { Action } from 'redux';

import { RootState } from '../../store/index';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { saveMovie, selectedMovie } from './thunks';

const mapStateToProps = (state: RootState) => ({
  movie: state.movie.movie,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  return {
    addNewMovie: (movie: IMovieData) => dispatch(saveMovie(movie)),
    selectMovie: () => dispatch(selectedMovie(null)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const AddMovie: React.FunctionComponent<Props> = ({
  movie,
  addNewMovie,
  selectMovie,
}) => {
  const [showAddMovieModal, setShowAddMovieModal] = React.useState<boolean>(
    false
  );
  const [movieTypes, setClasificationTypes] = React.useState<IClasification[]>(
    clasificationTypes
  );

  const handleShowAddMovieWindow = React.useCallback(() => {
    selectMovie();
    setShowAddMovieModal(!showAddMovieModal);
  }, [showAddMovieModal]);

  const handleSubmitAddMovie = function (movieToSave: IMovieData) {
    addNewMovie(movieToSave);
  };

  return (
    <>
      <div className="add-movie col-2">
        <button
          className="btn btn-add-movie"
          onClick={handleShowAddMovieWindow}
        >
          +Add Movie
        </button>
      </div>
      {/* <AddMovieWindow
        clasificationMovies={movieTypes}
        showModal={showAddMovieModal}
        movie={movie}
        onShowAddMovieWindow={handleShowAddMovieWindow}
        onAddMovieSubmit={handleSubmitAddMovie}
      /> */}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);
