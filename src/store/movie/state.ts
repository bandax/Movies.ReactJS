import { IMovie } from "../../interfaces/IResultsMovies";

export interface MovieState {
  movies: IMovie[];
  loading: boolean;
  errorMessage: string;
}
