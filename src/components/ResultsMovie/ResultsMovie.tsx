import * as React from "react";
import "./ResultsMovie.scss";
import { IMovieData } from "../../interfaces/IMovieData";
import { DetailsMovie } from "../DetailsMovie/DetailsMovie";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";
import * as constants from "../../store/movie/constants";
import { loadMovies } from "./thunks";
import { ThunkDispatch } from "redux-thunk";
import { getMoviesLoading, getMoviesData } from "./selectors";
import { Action } from "redux";

const moviesInit: IMovieData[] = [];
const mapState = (state: RootState) => ({
  movies: getMoviesData(state),
  isLoading: getMoviesLoading(state),
});

const mapDispatch = (dispatch: ThunkDispatch<RootState, void, Action>) => {
  return {
    startLoadingMovies: () => dispatch(loadMovies()),
  };
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IResultsMovieProps {
  resultsMovies: IMovieData[];
}

const ResultsMovie: React.FunctionComponent<Props> = ({
  movies,
  startLoadingMovies,
  isLoading,
}) => {
  React.useEffect(() => {
    startLoadingMovies();
  }, []);

  const loadingMessage = <div>Loading movies...</div>;
  console.log("Rendering movies");

  const content = (
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
  );

  return isLoading ? loadingMessage : content;
};

export default connector(ResultsMovie);
