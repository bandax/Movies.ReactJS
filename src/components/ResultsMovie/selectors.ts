import { RootState } from '../../store/index';

export const getMoviesLoading = (state: RootState) => state.movie.loading;
export const getMoviesData = (state: RootState) => state.movie.movies;
export const getFindMovies = (state: RootState) => state.movie.findMovies;
