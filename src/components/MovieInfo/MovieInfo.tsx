import * as React from 'react';
import './MovieInfo.scss';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../../store/index';
import { getMovieById } from './thunks';
import { getMoviesLoading, getMoviesData } from '../ResultsMovie/selectors';

interface IParamTypes {
  movieId: string;
}

const mapStateToProps = (state: RootState) => ({
  movie: state.movie.movie,
  movies: getMoviesData(state),
  isLoading: getMoviesLoading(state),
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>,
) => {
  return {
    getMovieByIdFunc: (id: string) => dispatch(getMovieById(id)),
  };
};

/* eslint-disable */
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
/* eslint-enable */

const MovieInfo: React.FunctionComponent<Props> = ({
  movie,
  movies,
  isLoading,
  getMovieByIdFunc,
}) => {
  const { movieId } = useParams<IParamTypes>();

  React.useEffect(() => {
    getMovieByIdFunc(movieId);
  }, []);

  const getYear = function gteYearFunc(releaseDate: string) {
    const date = new Date(releaseDate);
    return date.getFullYear();
  };

  const loadingMessage = <div>Searching movies...</div>;
  const content = (
    <>
      <div className="row">
        <div className="col-4 movie-image">
          <img
            width="50%"
            className="poster-movie"
            src={movie?.poster_path}
            alt={movie?.title}
          />
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
