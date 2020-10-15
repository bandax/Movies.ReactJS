import * as React from 'react';
import './AddMovieWindow.scss';
import { IClasification } from '../../interfaces/IClasificationMovie';
import { IMovieData } from '../../interfaces/IMovieData';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FormikTextInput } from '../Shared/FormikTextInput';
import { FormikMultiSelect } from '../Shared/FormikMultiSelect';
import { FormikDatePicker } from '../Shared/FormikDatePicker';
import { IOption } from '../../interfaces/IOption';

interface IAddMovieWindowProps {
  showModal: boolean;
  clasificationMovies: IClasification[];
  movie?: IMovieData;
  onShowAddMovieWindow: () => void;
  onAddMovieSubmit: (movie: IMovieData) => void;
}

interface IFormMovieValues {
  id: number;
  title: string;
  budget: number;
  revenue: number;
  tagline: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  poster_path: string;
  runtime: number;
  release_date: Date;
  genres: IOption[];
}

const AddMovieWindow: React.FunctionComponent<IAddMovieWindowProps> = (
  props: IAddMovieWindowProps
) => {
  const [genreOptions, setOptionGenres] = React.useState([]);

  React.useEffect(() => {
    const optGenres: IOption[] = props.clasificationMovies.map(
      (option: IClasification) => ({
        label: option.name,
        value: option.id,
      })
    );

    setOptionGenres(optGenres);
  }, [props.clasificationMovies]);

  const [selectedGenres, setSelectedGenres] = React.useState([]);

  React.useEffect(() => {
    const selGenres: IOption[] = [];
    props.movie?.genres.forEach((genre) => {
      const [selectedGenre] = genreOptions.filter(
        (g: IOption) => g.label === genre
      );
      if (selectedGenre) {
        selGenres.push(selectedGenre);
      }
    });
    setSelectedGenres(selGenres);
  }, [genreOptions]);

  const initialValues: IFormMovieValues = {
    budget: props.movie?.budget ?? 0,
    revenue: props.movie?.revenue ?? 0,
    tagline: props.movie?.tagline ?? '',
    vote_average: props.movie?.vote_average ?? 0,
    vote_count: props.movie?.vote_count ?? 0,
    id: props.movie?.id ?? 0,
    title: props.movie?.title ?? '',
    overview: props.movie?.overview ?? '',
    poster_path: props.movie?.poster_path ?? '',
    runtime: props.movie?.runtime ?? 0,
    release_date: props.movie?.release_date
      ? new Date(props.movie?.release_date)
      : new Date(),
    genres: selectedGenres,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    runtime: Yup.number().required('Required').positive().integer(),
    budget: Yup.number().required('Required').positive().integer(),
    revenue: Yup.number().required('Required').positive().integer(),
    vote_average: Yup.number().required('Required'),
    vote_count: Yup.number().required('Required').positive().integer(),
    overview: Yup.string().required('Required'),
    tagline: Yup.string().required('Required'),
    poster_path: Yup.string().required('Required').url(),
    release_date: Yup.date().default(() => new Date()),
  });

  const showMovieIdField = () => {
    return initialValues.id !== 0 ? (
      <>
        <FormikTextInput
          id="id"
          name="id"
          label="Movie Id"
          placeholder=""
          type="text"
          readOnly="{true}"
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
        <h2 className="add-movie-title">Add movie window</h2>
        <button
          className="add-movie-close"
          data-testid="add-movie-close"
          onClick={props.onShowAddMovieWindow}
        >
          &times;
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            const selGenres: string[] = values.genres.map((option: IOption) => {
              return option.label;
            });
            console.log(values.release_date);

            const movieToSave: IMovieData = {
              ...values,
              genres: selGenres,
              release_date: values.release_date.toLocaleDateString(),
            };

            props.onAddMovieSubmit(movieToSave);
          }}
        >
          <Form>
            <div className="add-movie-content">
              <div className="row">
                <div className="col-6">
                  {showMovieIdField()}

                  <FormikTextInput
                    id="title"
                    name="title"
                    label="Title"
                    placeholder="Title"
                    type="text"
                  />

                  <FormikDatePicker
                    id="release_date"
                    name="release_date"
                    label="Release Date"
                  />

                  <FormikTextInput
                    id="poster_path"
                    name="poster_path"
                    label="Movie URL"
                    placeholder="Movie URL here"
                    type="text"
                  />

                  <FormikMultiSelect
                    id="genres"
                    name="genres"
                    label="Genre"
                    selValue={selectedGenres}
                    options={genreOptions}
                  />

                  <FormikTextInput
                    id="overview"
                    name="overview"
                    label="Overview"
                    placeholder="Overview here"
                    type="text"
                  />
                </div>
                <div className="col-6">
                  <FormikTextInput
                    id="runtime"
                    name="runtime"
                    label="Runtime"
                    placeholder="Runtime here"
                    type="number"
                  />

                  <FormikTextInput
                    id="budget"
                    name="budget"
                    label="Budget"
                    placeholder="Budget"
                    type="number"
                  />

                  <FormikTextInput
                    id="tagline"
                    name="tagline"
                    label="Tagline"
                    placeholder="Tagline"
                    type="text"
                  />

                  <FormikTextInput
                    id="revenue"
                    name="revenue"
                    label="Revenue"
                    placeholder="Revenue here"
                    type="number"
                  />

                  <FormikTextInput
                    id="vote_average"
                    name="vote_average"
                    label="Vote Avg"
                    placeholder="vote"
                    type="number"
                  />

                  <FormikTextInput
                    id="vote_count"
                    name="vote_count"
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
