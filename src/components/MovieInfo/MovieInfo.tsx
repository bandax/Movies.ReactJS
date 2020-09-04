import * as React from "react"
import "./MovieInfo.scss"
import { IMovie } from "../../interfaces/IResultsMovies"

interface IMovieInfoProps {
    showModal: boolean
    movie: IMovie
    onHandleShowHideMovieInfoWindow: () => void
}

const MovieInfo: React.FunctionComponent<IMovieInfoProps> = (props) => {
    if (!props.showModal) {
        return null
    }

    const { movie } = props

    return (
        <div className="movie-info-window">
            <div className="movie-info-modal">
                <a
                    className="add-movie-close"
                    href="#"
                    onClick={props.onHandleShowHideMovieInfoWindow}
                >
                    &times;
                </a>
                <div className="row">
                    <div className="col-4 movie-image">
                        <img className="poster-movie" src={movie.image} />
                    </div>
                    <div className="col-8">
                        <div className="">
                            <h1 className="movie-title">{movie.title}</h1>{" "}
                            <span className="movie-rate">{movie.rate}</span>
                        </div>
                        <div>
                            <span className="movie-year">{movie.year}</span>{" "}
                            <span className="movie-duration">
                                {movie.runtime}
                            </span>
                        </div>
                        <div>
                            <p className="movie-review">{movie.review}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { MovieInfo }
