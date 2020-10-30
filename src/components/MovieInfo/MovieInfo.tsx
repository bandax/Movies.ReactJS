import * as React from 'react';
import './MovieInfo.scss';
import { IMovie } from '../../interfaces/IResultsMovies';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../store/index';
import { getMovieById } from './thunks';
import { ThunkDispatch } from 'redux-thunk';
import { getMoviesLoading, getMoviesData } from '../ResultsMovie/selectors';
import { Action } from 'redux';

interface IParamTypes {
  movieId: string;
}

const mapStateToProps = (state: RootState) => ({
  movie: state.movie.movie,
  movies: getMoviesData(state),
  isLoading: getMoviesLoading(state),
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  return {
    getMovieById: (id: string) => dispatch(getMovieById(id)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const MovieInfo: React.FunctionComponent<Props> = ({
  movie,
  movies,
  isLoading,
  getMovieById,
}) => {
  const { movieId } = useParams<IParamTypes>();

  React.useEffect(() => {
    getMovieById(movieId);
  }, []);

  const getYear = function (releaseDate: string) {
    const date = new Date(releaseDate);
    return date.getFullYear();
  };

  const loadingMessage = <div>Searching movies...</div>;
  const content = (
    <>
      <div className="row">
        <div className="col-4 movie-image">
          <img width="50%" className="poster-movie" src={movie?.poster_path} />
        </div>
        <div className="col-8">
          <div className="">
            <h1 className="movie-title" data-testid="movie-title">
              {movie?.title}
            </h1>{' '}
            Rate: <span className="movie-rate">{movie?.vote_average}</span>
          </div>
          <div>
            Release Date:{' '}
            <span className="movie-year">{getYear(movie?.release_date)}</span>{' '}
          </div>
          <div>
            Overview: <p className="movie-review">{movie?.overview}</p>
          </div>
        </div>
      </div>
    </>
  );

  return isLoading ? loadingMessage : content;
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
