import * as React from 'react';
import './DeleteMovie.scss';
import { IMovieData } from '../../interfaces/IMovieData';

interface IDeleteMovieWindowProps {
  showDeleteMovieModal: boolean;
  movieId: number;
  onShowDeleteMovieWindow: (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
  ) => void;
  onConfirmDeleteMovie: (id: number) => void;
}

const DeleteMovieWindow: React.FunctionComponent<IDeleteMovieWindowProps> = (
  props: IDeleteMovieWindowProps
) => {
  const onSubmitClicked = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onConfirmDeleteMovie(props.movieId);
  };

  if (!props.showDeleteMovieModal) {
    return null;
  }
  return (
    <div className="delete-movie-window">
      <div className="delete-movie-modal">
        <h2 className="delete-movie-title">Delete movie</h2>
        <a
          className="delete-movie-close"
          href="#"
          onClick={props.onShowDeleteMovieWindow}
        >
          &times;
        </a>
        <div className="delete-movie-content">
          Are you sure you want to delete this movie?
        </div>
        <div className="delete-movie-actions">
          <button className="btn btn-confirm" onClick={onSubmitClicked}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export { DeleteMovieWindow };
