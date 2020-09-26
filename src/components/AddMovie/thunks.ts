import { Action } from "redux";
import {
  addMovie,
  updateMovie,
  selectMovie,
  deleteMovie,
  loadingMoviesError,
} from "../../store/movie/actions";
import { RootState } from "../../store/index";
import { ThunkDispatch } from "redux-thunk";
import { IMovieData } from "../../interfaces/IMovieData";
import { INetworkData } from "../../interfaces/INetWorkData";
import {
  postRequest,
  putRequest,
  deleteRequest,
} from "../../services/networkService";

export const saveMovie = (movie: IMovieData) => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  try {
    let data: INetworkData;
    let response: Response;
    let isNewMovie = true;
    if (movie.id === 0) {
      delete movie.id;
      data = {
        body: JSON.stringify(movie),
        contentType: "application/json",
        url: "http://localhost:4000/movies",
      };
      response = await postRequest(data);
    } else {
      data = {
        body: JSON.stringify(movie),
        contentType: "application/json",
        url: "http://localhost:4000/movies",
      };
      isNewMovie = false;
      response = await putRequest(data);
    }

    if (response.status >= 200 && response.status < 400) {
      const movieUpdated = await response.json();
      if (isNewMovie) {
        dispatch(addMovie(movieUpdated));
      } else {
        dispatch(updateMovie(movieUpdated));
      }
    } else {
      const data = await response.json();
      const messages = data.messages;
      let allMessages = "Error with message: \n";
      messages.forEach((message: string) => {
        allMessages = allMessages.concat(message + "\n");
      });
      alert(allMessages);
    }
  } catch (e) {
    dispatch(loadingMoviesError(e));
  }
};

export const deleteSelectedMovie = (id: number) => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  try {
    const response = await deleteRequest(`http://localhost:4000/movies/${id}`);
    if (response.status >= 200) {
      dispatch(deleteMovie(id));
    }
  } catch (e) {
    dispatch(loadingMoviesError(e));
  }
};

export const selectedMovie = (movie: IMovieData) => (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch(selectMovie(movie));
};
