import * as React from 'react';
import './AddMovieWindow.scss';
import { IClasification } from '../../interfaces/IClasificationMovie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MultiSelect from 'react-multi-select-component';
import { useForm } from './useForm';
import { IMovieData } from '../../interfaces/IMovieData';

interface IAddMovieWindowProps {
  showModal: boolean;
  clasificationMovies: IClasification[];
  movie?: IMovieData;
  onShowAddMovieWindow: () => void;
  onAddMovieSubmit: (movie: IMovieData) => void;
}

interface IOptions {
  label: string;
  value: string;
}

const AddMovieWindow: React.FunctionComponent<IAddMovieWindowProps> = (
  props: IAddMovieWindowProps
) => {
  const initialValues = {
    budget: props.movie?.budget ?? 0,
    revenue: props.movie?.revenue ?? 0,
    tagline: props.movie?.tagline ?? '',
    vote_average: props.movie?.vote_average ?? 0,
    vote_count: props.movie?.vote_average ?? 0,
    movieId: props.movie?.id ?? 0,
    title: props.movie?.title ?? '',
    overview: props.movie?.overview ?? '',
    url: props.movie?.poster_path ?? '',
    runtime: props.movie?.runtime ?? 0,
  };

  const [values, handleChange] = useForm(initialValues);
  const [releaseValueDate, setReleaseValueDate] = React.useState(
    props.movie?.release_date ?? new Date().toISOString()
  );
  const [releaseDate, setReleaseDate] = React.useState(
    props.movie?.release_date ? new Date(props.movie.release_date) : new Date()
  );
  const [genres, setGenres] = React.useState(props.movie?.genres ?? []);
  const [optionGenres, setOptionGenres] = React.useState([]);
  const [selectedGenres, setSelectedGenres] = React.useState([]);

  React.useEffect(() => {
    handleChange(undefined, initialValues);
    setGenres(props.movie?.genres ?? []);
    setReleaseValueDate(props.movie?.release_date ?? new Date().toISOString());
    setReleaseDate(
      props.movie?.release_date
        ? new Date(props.movie.release_date)
        : new Date()
    );
  }, [props.movie]);

  React.useEffect(() => {
    const optGenres: IOptions[] = props.clasificationMovies.map(
      (clasOption: IClasification) => ({
        label: clasOption.name,
        value: clasOption.id,
      })
    );

    setOptionGenres(optGenres);
  }, [props.clasificationMovies]);

  React.useEffect(() => {
    const selGenres: IOptions[] = [];
    genres.forEach((genre) => {
      const selectedGenre: IOptions = optionGenres.filter(
        (g) => g.label === genre
      )[0];

      if (selectedGenre) {
        selGenres.push(selectedGenre);
      }
    });

    setSelectedGenres(selGenres);
  }, [genres]);

  const showMovieIdField = () => {
    return values.movieId !== 0 ? (
      <>
        <label className="label-text" htmlFor="movieId">
          Movie Id
        </label>
        <input
          className="input-text"
          id="movieId"
          name="movieId"
          placeholder=""
          readOnly
          value={values.movieId}
          onChange={handleChange}
        />{' '}
      </>
    ) : null;
  };

  const onSelectedGenres = (e: IOptions[]) => {
    const selGenres: string[] = e.map((option: IOptions) => {
      return option.label;
    });
    setGenres(selGenres);
  };

  const onReleaseDateChange = (e: Date) => {
    setReleaseDate(e);
    setReleaseValueDate(e.toISOString());
  };

  const onResetClicked = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleChange(undefined, initialValues);
    const releaseDate = props.movie?.release_date
      ? new Date(props.movie.release_date)
      : new Date();
    setReleaseDate(releaseDate);
    setReleaseValueDate(releaseDate.toISOString());
    setGenres(props.movie?.genres ?? []);
  };

  const onSubmitClicked = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const movieToSave: IMovieData = {
      budget: parseInt(values.budget, 0),
      genres: genres,
      id: parseInt(values.movieId, 0),
      overview: values.overview,
      poster_path: values.url,
      release_date: releaseValueDate,
      revenue: parseInt(values.revenue, 0),
      runtime: parseInt(values.runtime, 0),
      tagline: values.tagline,
      title: values.title,
      vote_average: parseInt(values.vote_average, 0),
      vote_count: parseInt(values.vote_count, 0),
    };
    props.onAddMovieSubmit(movieToSave);
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
          onClick={props.onShowAddMovieWindow}
        >
          &times;
        </button>
        <div className="add-movie-content">
          <div className="row">
            <div className="col-6">
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
                labelledBy={'Select'}
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
            </div>
            <div className="col-6">
              <label className="label-text" htmlFor="runtime">
                Runtime
              </label>
              <input
                type="number"
                className="input-text"
                id="runtime"
                name="runtime"
                placeholder="Runtime here"
                value={values.runtime}
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="budget">
                Budget
              </label>
              <input
                className="input-text"
                id="budget"
                name="budget"
                placeholder="Budget"
                value={values.budget}
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="tagline">
                Tagline
              </label>
              <input
                className="input-text"
                id="tagline"
                name="tagline"
                placeholder="Tagline"
                value={values.tagline}
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="revenue">
                Revenue
              </label>
              <input
                className="input-text"
                id="revenue"
                name="revenue"
                placeholder="revenue"
                value={values.revenue}
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="vote_average">
                Vote
              </label>
              <input
                className="input-text"
                id="vote_average"
                name="vote_average"
                placeholder="vote_average"
                value={values.vote_average}
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="vote_count">
                Vote Count
              </label>
              <input
                className="input-text"
                id="vote_count"
                name="vote_count"
                placeholder="vote_count"
                value={values.vote_count}
                onChange={handleChange}
              />
            </div>
          </div>
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
