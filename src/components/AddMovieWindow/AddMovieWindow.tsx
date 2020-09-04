import * as React from "react"
import "./AddMovieWindow.scss"
import { IClasification } from "../../interfaces/IClasificationMovie"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { IMovie } from "../../interfaces/IResultsMovies"
import MultiSelect from "react-multi-select-component"

type AddMovieWindowProps = {
    showModal: boolean
    clasificationMovies: IClasification[]
    movie: IMovie
    onHandleShowAddMovieWindow: () => void
}

type AddMovieWindowState = {
    movieId: string
    title: string
    releaseDate: string
    url: string
    genres: IClasification[]
    overview: string
    runtime: string
}

interface IOptions {
    label: string
    value: string
}

class AddMovieWindow extends React.Component<
    AddMovieWindowProps,
    AddMovieWindowState
    > {
    constructor(props: AddMovieWindowProps) {
        super(props)
        this.initState()
    }

    initState() {
        this.state = {
            movieId: this.props.movie?.id ?? "",
            title: this.props.movie?.title ?? "",
            releaseDate: this.props.movie?.releaseDate ?? "",
            overview: this.props.movie?.review ?? "",
            url: this.props.movie?.url ?? "",
            genres: this.props.movie?.categories ?? [],
            runtime: this.props.movie?.runtime ?? "",
        }
    }

    get releaseDate() {
        return this.state.releaseDate !== ""
            ? new Date(this.state.releaseDate)
            : new Date()
    }

    get optionsGenre() {
        return this.props.clasificationMovies.map(
            (clasOption: IClasification) => ({
                label: clasOption.name,
                value: clasOption.id,
            })
        )
    }

    get selectedGenres() {
        return this.state.genres.map((clasOption: IClasification) => ({
            label: clasOption.name,
            value: clasOption.id,
        }))
    }

    get showMovieIdField() {
        return this.state.movieId !== "" ? (
            <>
                <label className="label-text" htmlFor="movieId">
                    Movie Id
                </label>
                <input
                    className="input-text"
                    id="movieId"
                    name="movieId"
                    placeholder=""
                    value={this.state.movieId}
                    onChange={this.onChangeInput}
                />{" "}
            </>
        ) : null
    }

    onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        this.setState({
            ...this.state,
            [e.currentTarget.name]: value,
        })
    }

    onSelectedGenres = (e: IOptions[]) => {
        const genres: IClasification[] = e.map((option: IOptions) => ({
            id: option.value,
            name: option.label,
        }))

        this.setState({ genres })
    }

    onReleaseDateChange = (e: Date) => {
        this.setState({
            releaseDate: e.toISOString(),
        })
    }

    onResetClicked = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        this.setState({
            movieId: this.props.movie?.id ?? "",
            title: this.props.movie?.title ?? "",
            releaseDate: this.props.movie?.releaseDate ?? "",
            overview: this.props.movie?.review ?? "",
            url: this.props.movie?.url ?? "",
            genres: this.props.movie?.categories ?? [],
            runtime: this.props.movie?.runtime ?? "",
        })
    }

    onSubmitClicked = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        alert("Saving data")
    }

    render() {
        if (!this.props.showModal) {
            return null
        }

        return (
            <div className="add-movie-window">
                <div className="add-movie-modal">
                    <h2 className="add-movie-title">Add movie</h2>
                    <a
                        className="add-movie-close"
                        href="#"
                        onClick={this.props.onHandleShowAddMovieWindow}
                    >
                        &times;
                    </a>
                    <div className="add-movie-content">
                        {this.showMovieIdField}

                        <label className="label-text" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="input-text"
                            id="title"
                            name="title"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.onChangeInput}
                        />

                        <label className="label-text" htmlFor="releaseDate">
                            Release Date
                        </label>
                        <DatePicker
                            selected={this.releaseDate}
                            onChange={this.onReleaseDateChange}
                            className="date-icon input-text"
                        />

                        <label className="label-text" htmlFor="url">
                            Movie URL
                        </label>
                        <input
                            className="input-text"
                            id="url"
                            name="url"
                            placeholder="Movie URL here"
                            value={this.state.url}
                            onChange={this.onChangeInput}
                        />

                        <label className="label-text" htmlFor="genre">
                            Genre
                        </label>
                        <MultiSelect
                            options={this.optionsGenre}
                            value={this.selectedGenres}
                            onChange={this.onSelectedGenres}
                            labelledBy={"Select"}
                        />

                        <label className="label-text" htmlFor="overview">
                            Overview
                        </label>
                        <input
                            className="input-text"
                            id="overview"
                            name="overview"
                            placeholder="Overview here"
                            value={this.state.overview}
                            onChange={this.onChangeInput}
                        />

                        <label className="label-text" htmlFor="runtime">
                            Runtime
                        </label>
                        <input
                            className="input-text"
                            id="runtime"
                            name="runtime"
                            placeholder="Runtime here"
                            value={this.state.runtime}
                            onChange={this.onChangeInput}
                        />
                    </div>
                    <div className="actions">
                        <button
                            className="btn btn-reset"
                            onClick={this.onResetClicked}
                        >
                            Reset
                        </button>
                        <button className="btn btn-submit">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export { AddMovieWindow }
