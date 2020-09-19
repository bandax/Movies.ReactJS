import * as React from "react";
import "./ResultsMovie.scss";
import { IMovie } from "../../interfaces/IResultsMovies";
import { DetailsMovie } from "../DetailsMovie/DetailsMovie";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";
import * as constants from "../../store/movie/constants";
import { thunkSendMessage } from "./thunks";
import { ThunkDispatch } from "redux-thunk";

const moviesInit: IMovie[] = [];
const mapState = (state: RootState) => ({
  movies: moviesInit,
});

type MyThunkDispatch = ThunkDispatch<RootState, undefined, any>;

const mapDispatch = (dispatch: MyThunkDispatch) => ({
  startLoadingMovies: () => dispatch(thunkSendMessage),
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  counter: number;
};

interface IResultsMovieProps {
  resultsMovies: IMovie[];
}

const ResultsMovie: React.FunctionComponent<Props> = ({
  movies = [],
  startLoadingMovies,
  counter = 1,
}) => {
  // const { movies, counter } = props;
  React.useEffect(() => {
    startLoadingMovies();
  }, []);

  return (
    <div className="list-movies">
      <div className="total-result">
        <span className="found-label">
          <b>{movies.length}</b> movies found {counter}
        </span>
      </div>
      <div className="display-movie">
        {movies.map((movie: IMovie) => (
          <DetailsMovie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default connector(ResultsMovie);
