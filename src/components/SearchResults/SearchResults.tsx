import * as React from 'react';
import { useParams, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IMovieData } from '../../interfaces/IMovieData';
import { DetailsMovie } from '../DetailsMovie/DetailsMovie';
import { RootState } from '../../store/index';
import { searchMovies } from './thunks';
import {
  getMoviesLoading,
  getMoviesData,
  getFindMovies,
} from '../ResultsMovie/selectors';

interface IParamTypes {
  searchQuery: string;
}

const mapStateToProps = (state: RootState) => ({
  movie: state.movie.movie,
  movies: getMoviesData(state),
  isLoading: getMoviesLoading(state),
  findMovies: getFindMovies(state),
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>,
) => {
  return {
    searchMoviesFunc: (term: string) => dispatch(searchMovies(term)),
  };
};

/* eslint-disable */
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;
/* eslint-enable */

const SearchResults: React.FunctionComponent<Props> = ({
  movie,
  movies,
  isLoading,
  searchMoviesFunc,
  history,
  findMovies,
}) => {
  const { searchQuery } = useParams<IParamTypes>();

  React.useEffect(() => {
    searchMoviesFunc(searchQuery);
  }, []);

  if (!findMovies && movies.length === 0) {
    return <div className="app">No movies found</div>;
  }

  const loadingMessage = <div>Searching movies...</div>;
  const content = (
    <>
      <div className="app">Results for {searchQuery}</div>
      <div className="list-movies">
        <div className="total-result">
          <span className="found-label">
            <b>{movies.length}</b> movies found
          </span>
        </div>
        <div className="display-movie">
          {movies.map((movieDetails: IMovieData) => (
            <DetailsMovie key={movieDetails.id} movie={movieDetails} />
          ))}
        </div>
      </div>
    </>
  );

  return isLoading ? loadingMessage : content;
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchResults),
);
