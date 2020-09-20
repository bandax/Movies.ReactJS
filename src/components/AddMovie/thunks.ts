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

export const saveMovie = (movie: IMovieData) => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  try {
    let method = "post";
    if (movie.id === 0) {
      delete movie.id;
    } else {
      method = "put";
    }
    const body = JSON.stringify(movie);
    const response = await fetch("http://localhost:4000/movies", {
      headers: {
        "Content-Type": "application/json",
      },
      method: method,
      body,
    });

    if (response.status >= 200) {
      const movieUpdated = await response.json();
      if (method === "post") {
        dispatch(addMovie(movieUpdated));
      } else {
        dispatch(updateMovie(movieUpdated));
      }
    } else {
      const data = await response.json();
      const messages = data.messages;
      console.log(messages);

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
    const response = await fetch(`http://localhost:4000/movies/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "delete",
    });
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
