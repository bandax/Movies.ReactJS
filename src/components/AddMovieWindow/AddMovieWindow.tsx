import * as React from 'react';
import './AddMovieWindow.scss';
import { IClasification } from '../../interfaces/IClasificationMovie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MultiSelect from 'react-multi-select-component';
import { IMovieData } from '../../interfaces/IMovieData';
import * as Yup from 'yup';
import { Formik, Form, useField, useFormikContext } from 'formik';

interface IAddMovieWindowProps {
  showModal: boolean;
  clasificationMovies: IClasification[];
  movie?: IMovieData;
  onShowAddMovieWindow: () => void;
  onAddMovieSubmit: (movie: IMovieData) => void;
}

interface IOption {
  label: string;
  value: string;
}

interface IFormMovieValues {
  movieId: number;
  title: string;
  budget: number;
  revenue: number;
  tagline: string;
  voteAverage: number;
  voteCount: number;
  overview: string;
  url: string;
  runtime: number;
  releaseDate: Date;
  genres: IOption[];
}

const MovieTextInput = ({ ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      <label htmlFor={props.id || props.name} className="label-text">
        {props.label}
      </label>
      <input className="input-text" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const FormikDatePicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props.name);

  return (
    <>
      <DatePicker
        selected={field.value}
        onChange={(val: Date) => {
          setFieldValue(field.name, val);
        }}
        className="date-icon input-text"
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const FormikMultiSelect = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props.name);

  React.useEffect(() => {
    setFieldValue(field.name, props.selValue);
  }, [props.selValue]);

  const onSelectedOption = (selectedOptions: IOption[]) => {
    setFieldValue(field.name, selectedOptions);
  };

  return (
    <>
      <MultiSelect
        options={props.options}
        value={field.value}
        onChange={onSelectedOption}
        labelledBy={'Select'}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const AddMovieWindow: React.FunctionComponent<IAddMovieWindowProps> = (
  props: IAddMovieWindowProps
) => {
  const [genreOptions, setOptionGenres] = React.useState([]);

  React.useEffect(() => {
    const optGenres: IOption[] = props.clasificationMovies.map(
      (clasOption: IClasification) => ({
        label: clasOption.name,
        value: clasOption.id,
      })
    );

    setOptionGenres(optGenres);
  }, [props.clasificationMovies]);

  const [selectedGenres, setSelectedGenres] = React.useState([]);

  React.useEffect(() => {
    const selGenres: IOption[] = [];
    props.movie?.genres.forEach((genre) => {
      const selectedGenre: IOption = genreOptions.filter(
        (g: IOption) => g.label === genre
      )[0];

      if (selectedGenre) {
        selGenres.push(selectedGenre);
      }
    });

    setSelectedGenres(selGenres);
  }, [props.movie]);

  const initialValues: IFormMovieValues = {
    budget: props.movie?.budget ?? 0,
    revenue: props.movie?.revenue ?? 0,
    tagline: props.movie?.tagline ?? '',
    voteAverage: props.movie?.vote_average ?? 0,
    voteCount: props.movie?.vote_average ?? 0,
    movieId: props.movie?.id ?? 0,
    title: props.movie?.title ?? '',
    overview: props.movie?.overview ?? '',
    url: props.movie?.poster_path ?? '',
    runtime: props.movie?.runtime ?? 0,
    releaseDate: props.movie?.release_date
      ? new Date(props.movie?.release_date)
      : new Date(),
    genres: selectedGenres,
  };

  const showMovieIdField = () => {
    return initialValues.movieId !== 0 ? (
      <>
        <MovieTextInput
          id="movieId"
          name="movieId"
          label="Movie Id"
          placeholder=""
          type="text"
        />
      </>
    ) : null;
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
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string().required('Required'),
            runtime: Yup.number().required('Required').positive().integer(),
            budget: Yup.number().required('Required').positive().integer(),
            revenue: Yup.number().required('Required').positive().integer(),
            voteAverage: Yup.number().required('Required').positive().integer(),
            voteCount: Yup.number().required('Required').positive().integer(),
            overview: Yup.string().required('Required'),
            tagline: Yup.string().required('Required'),
            url: Yup.string().required('Required').url(),
            releaseDate: Yup.date().default(() => new Date()),
          })}
          onSubmit={(values, actions) => {
            const selGenres: string[] = values.genres.map((option: IOption) => {
              return option.label;
            });

            const movieToSave: IMovieData = {
              budget: values.budget,
              genres: selGenres,
              id: values.movieId,
              overview: values.overview,
              poster_path: values.url,
              release_date: values.releaseDate.toISOString(),
              revenue: values.revenue,
              runtime: values.runtime,
              tagline: values.tagline,
              title: values.title,
              vote_average: values.voteAverage,
              vote_count: values.voteCount,
            };

            props.onAddMovieSubmit(movieToSave);
          }}
        >
          <Form>
            <div className="add-movie-content">
              <div className="row">
                <div className="col-6">
                  {showMovieIdField()}

                  <MovieTextInput
                    id="title"
                    name="title"
                    label="Title"
                    placeholder="Title"
                    type="text"
                  />

                  <label className="label-text" htmlFor="releaseDate">
                    Release Date
                  </label>
                  <FormikDatePicker id="releaseDate" name="releaseDate" />

                  <MovieTextInput
                    id="url"
                    name="url"
                    label="Movie URL"
                    placeholder="Movie URL here"
                    type="text"
                  />

                  <label className="label-text" htmlFor="genre">
                    Genre
                  </label>
                  <FormikMultiSelect
                    id="genres"
                    name="genres"
                    selValue={selectedGenres}
                    options={genreOptions}
                  />

                  <MovieTextInput
                    id="overview"
                    name="overview"
                    label="Overview"
                    placeholder="Overview here"
                    type="text"
                  />
                </div>
                <div className="col-6">
                  <MovieTextInput
                    id="runtime"
                    name="runtime"
                    label="Runtime"
                    placeholder="Runtime here"
                    type="number"
                  />

                  <MovieTextInput
                    id="budget"
                    name="budget"
                    label="Budget"
                    placeholder="Budget"
                    type="number"
                  />

                  <MovieTextInput
                    id="tagline"
                    name="tagline"
                    label="Tagline"
                    placeholder="Tagline"
                    type="text"
                  />

                  <MovieTextInput
                    id="revenue"
                    name="revenue"
                    label="Revenue"
                    placeholder="Revenue here"
                    type="number"
                  />

                  <MovieTextInput
                    id="voteAverage"
                    name="voteAverage"
                    label="Vote Avg"
                    placeholder="vote"
                    type="number"
                  />

                  <MovieTextInput
                    id="voteCount"
                    name="voteCount"
                    label="Vote Count"
                    placeholder="vote count"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="actions">
              <button className="btn btn-reset" type="reset">
                Reset
              </button>
              <button className="btn btn-submit" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export { AddMovieWindow };
