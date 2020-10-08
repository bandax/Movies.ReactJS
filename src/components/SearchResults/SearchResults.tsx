import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { IMovieData } from '../../interfaces/IMovieData';
import { DetailsMovie } from '../DetailsMovie/DetailsMovie';
import { connect } from 'react-redux';
import { RootState } from '../../store/index';
import { searchMovies } from './thunks';
import { ThunkDispatch } from 'redux-thunk';
import { getMoviesLoading, getMoviesData } from '../ResultsMovie/selectors';
import { Action } from 'redux';

const mapStateToProps = (state: RootState) => ({
  movie: state.movie.movie,
  movies: getMoviesData(state),
  isLoading: getMoviesLoading(state),
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  return {
    searchMovies: (term: string) => dispatch(searchMovies(term)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const SearchResults: React.FunctionComponent<Props> = ({
  movie,
  movies,
  searchMovies,
  isLoading,
}) => {
  const params = new URLSearchParams(useLocation().search);
  const term = params.get('term');
  React.useEffect(() => {
    console.log(`searching ${term}`);
    searchMovies(term);
  }, []);

  const handleEditMovie = function (movie: IMovieData) {
    console.log('tests');
  };

  const handleDeleteMovie = function (movie: IMovieData) {
    console.log('tests');
  };

  const loadingMessage = <div>Searching movies...</div>;
  const content = (
    <>
      <div className="app">Results for {term}</div>
      <div className="list-movies">
        <div className="total-result">
          <span className="found-label">
            <b>{movies.length}</b> movies found
          </span>
        </div>
        <div className="display-movie">
          {movies.map((movie: IMovieData) => (
            <DetailsMovie
              key={movie.id}
              movie={movie}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
