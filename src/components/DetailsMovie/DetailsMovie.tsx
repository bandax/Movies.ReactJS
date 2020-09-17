import * as React from "react"
import "./DetailsMovie.scss"
import { IMovie } from "../../interfaces/IResultsMovies"

export interface IDetailsMovieProps {
    movie: IMovie
}

const DetailsMovie: React.FunctionComponent<IDetailsMovieProps> = (
    props: IDetailsMovieProps
) => {
    const movie = props.movie

    return (
        <div className="details-movie" key={movie.id}>
            <img className="poster-movie" src={movie.image} />
            <br />
            <span className="title-movie">{movie.title}</span>
            <span className="year-movie">{movie.year}</span>
            <span className="categories-movie">
                {movie.categories.map((category) => category.name).join(", ")}
            </span>
        </div>
    )
}

export { DetailsMovie }
