import * as React from "react"
import "./DeleteMovie.scss"

type DeleteMovieWindowProps = {
    showDeleteMovieModal: boolean
    movieId: string
    onHandleShowDeleteMovieWindow: (
        e:
            | React.MouseEvent<HTMLButtonElement>
            | React.MouseEvent<HTMLAnchorElement>
    ) => void
}

class DeleteMovieWindow extends React.Component<DeleteMovieWindowProps, {}> {
    render() {
        if (!this.props.showDeleteMovieModal) {
            return null
        }
        return (
            <div className="delete-movie-window">
                <div className="delete-movie-modal">
                    <h2 className="delete-movie-title">Delete movie</h2>
                    <a
                        className="delete-movie-close"
                        href="#"
                        onClick={this.props.onHandleShowDeleteMovieWindow}
                    >
                        &times;
                    </a>
                    <div className="delete-movie-content">
                        Are you sure you want to delete this movie?
                    </div>
                    <div className="delete-movie-actions">
                        <button className="btn btn-confirm">Confirm</button>
                    </div>
                </div>
            </div>
        )
    }
}

export { DeleteMovieWindow }
