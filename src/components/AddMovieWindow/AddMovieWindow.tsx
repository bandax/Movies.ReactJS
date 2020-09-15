import * as React from "react";
import "./AddMovieWindow.scss";
import { IClasification } from "../../interfaces/IClasificationMovie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IMovie } from "../../interfaces/IResultsMovies";
import MultiSelect from "react-multi-select-component";
import { useForm } from "./useForm";

interface IAddMovieWindowProps {
  showModal: boolean;
  clasificationMovies: IClasification[];
  movie: IMovie;
  onHandleShowAddMovieWindow: () => void;
}

interface IOptions {
  label: string;
  value: string;
}

const AddMovieWindow: React.FunctionComponent<IAddMovieWindowProps> = (
  props: IAddMovieWindowProps
) => {
  const initialValues = {
    movieId: props.movie?.id ?? "",
    title: props.movie?.title ?? "",
    overview: props.movie?.review ?? "",
    url: props.movie?.url ?? "",
    runtime: props.movie?.runtime ?? "",
  };

  const [values, handleChange] = useForm(initialValues);
  const [releaseValueDate, setReleaseValueDate] = React.useState(
    props.movie?.releaseDate ?? ""
  );
  const [releaseDate, setReleaseDate] = React.useState(
    props.movie?.releaseDate ? new Date(props.movie.releaseDate) : new Date()
  );
  const [genres, setGenres] = React.useState(props.movie?.categories ?? []);
  const [optionGenres, setOptionGenres] = React.useState([]);
  const [selectedGenres, setSelectedGenres] = React.useState([]);

  React.useEffect(() => {
    const optionGenres = props.clasificationMovies.map(
      (clasOption: IClasification) => ({
        label: clasOption.name,
        value: clasOption.id,
      })
    );

    setOptionGenres(optionGenres);
  }, [props.clasificationMovies]);

  React.useEffect(() => {
    const selGenres = genres.map((clasOption: IClasification) => ({
      label: clasOption.name,
      value: clasOption.id,
    }));
    setSelectedGenres(selGenres);
  }, [genres]);

  const showMovieIdField = () => {
    return values.movieId !== "" ? (
      <>
        <label className="label-text" htmlFor="movieId">
          Movie Id
        </label>
        <input
          className="input-text"
          id="movieId"
          name="movieId"
          placeholder=""
          value={values.movieId}
          onChange={handleChange}
        />{" "}
      </>
    ) : null;
  };

  const onSelectedGenres = (e: IOptions[]) => {
    const selGenres: IClasification[] = e.map((option: IOptions) => ({
      id: option.value,
      name: option.label,
    }));
    setGenres(selGenres);
  };

  const onReleaseDateChange = (e: Date) => {
    setReleaseDate(e);
    setReleaseValueDate(e.toISOString());
  };

  const onResetClicked = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleChange(undefined, initialValues);
    const releaseDate = props.movie?.releaseDate
      ? new Date(props.movie.releaseDate)
      : new Date();
    setReleaseDate(releaseDate);
    setReleaseValueDate(releaseDate.toISOString());
    setGenres(props.movie?.categories ?? []);
  };

  const onSubmitClicked = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert(`Saving data ${values.title} ${releaseValueDate}`);
  };

  if (!props.showModal) {
    return null;
  }

  return (
    <div className="add-movie-window">
      <div className="add-movie-modal">
        <h2 className="add-movie-title">Add movie</h2>
        <button
          className="add-movie-close"
          onClick={props.onHandleShowAddMovieWindow}
        >
          &times;
        </button>
        <div className="add-movie-content">
          {showMovieIdField()}

          <label className="label-text" htmlFor="title">
            Title
          </label>
          <input
            className="input-text"
            id="title"
            name="title"
            placeholder="Title"
            value={values.title}
            onChange={handleChange}
          />

          <label className="label-text" htmlFor="releaseDate">
            Release Date
          </label>
          <DatePicker
            selected={releaseDate}
            onChange={onReleaseDateChange}
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
            value={values.url}
            onChange={handleChange}
          />

          <label className="label-text" htmlFor="genre">
            Genre
          </label>
          <MultiSelect
            options={optionGenres}
            value={selectedGenres}
            onChange={onSelectedGenres}
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
            value={values.overview}
            onChange={handleChange}
          />

          <label className="label-text" htmlFor="runtime">
            Runtime
          </label>
          <input
            className="input-text"
            id="runtime"
            name="runtime"
            placeholder="Runtime here"
            value={values.runtime}
            onChange={handleChange}
          />
        </div>
        <div className="actions">
          <button className="btn btn-reset" onClick={onResetClicked}>
            Reset
          </button>
          <button className="btn btn-submit" onClick={onSubmitClicked}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export { AddMovieWindow };
