import { IMovieData } from "../../interfaces/IMovieData";

export interface MovieState {
  movies: IMovieData[];
  loading: boolean;
  errorMessage: string;
}
