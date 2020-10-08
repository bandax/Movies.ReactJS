import { IMovieData } from '../../interfaces/IMovieData';

export interface MovieState {
  movie?: IMovieData;
  movies: IMovieData[];
  loading: boolean;
  errorMessage: string;
  findMovies: boolean;
}
