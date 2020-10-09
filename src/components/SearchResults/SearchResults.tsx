import * as React from 'react';
import { useParams, withRouter, RouteComponentProps } from 'react-router-dom';
import { IMovieData } from '../../interfaces/IMovieData';
import { DetailsMovie } from '../DetailsMovie/DetailsMovie';
import { connect } from 'react-redux';
import { RootState } from '../../store/index';
import { searchMovies } from './thunks';
import { ThunkDispatch } from 'redux-thunk';
import {
  getMoviesLoading,
  getMoviesData,
  getFindMovies,
} from '../ResultsMovie/selectors';
import { Action } from 'redux';

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
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  return {
    searchMovies: (term: string) => dispatch(searchMovies(term)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const SearchResults: React.FunctionComponent<Props> = ({
  movie,
  movies,
  isLoading,
  searchMovies,
  history,
  findMovies,
}) => {
  const { searchQuery } = useParams<IParamTypes>();

  React.useEffect(() => {
    searchMovies(searchQuery);
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
          {movies.map((movie: IMovieData) => (
            <DetailsMovie key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );

  return isLoading ? loadingMessage : content;
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchResults)
);
