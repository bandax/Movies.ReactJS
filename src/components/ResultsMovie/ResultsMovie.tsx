import * as React from "react";
import "./ResultsMovie.scss";
import { IMovie } from "../../interfaces/IResultsMovies";
import { DetailsMovie } from "../DetailsMovie/DetailsMovie";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";
import * as constants from "../../store/movie/constants";
import { loadMovies } from "./thunks";
import { ThunkDispatch } from "redux-thunk";
import { getMoviesLoading } from "./selectors";
import { Action } from "redux";

const moviesInit: IMovie[] = [];
const mapState = (state: RootState) => ({
  movies: moviesInit,
  isLoading: getMoviesLoading(state),
});

type MyThunkDispatch = ThunkDispatch<RootState, undefined, any>;

const mapDispatch = (dispatch: ThunkDispatch<RootState, void, Action>) => {
  return {
    startLoadingMovies: () => dispatch(loadMovies()),
  };
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IResultsMovieProps {
  resultsMovies: IMovie[];
}

const ResultsMovie: React.FunctionComponent<Props> = ({
  movies = [],
  startLoadingMovies,
  isLoading = false,
}) => {
  // const { movies, counter } = props;
  React.useEffect(() => {
    console.log("call loading movies");

    startLoadingMovies();
  }, []);

  const loadingMessage = <div>Loading movies...</div>;

  const content = (
    <div className="list-movies">
      <div className="total-result">
        <span className="found-label">
          <b>{movies.length}</b> movies found
        </span>
      </div>
      <div className="display-movie">
        {movies.map((movie: IMovie) => (
          <DetailsMovie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );

  return isLoading ? loadingMessage : content;
};

export default connector(ResultsMovie);
