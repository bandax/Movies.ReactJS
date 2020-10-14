import * as React from 'react';
import AddMovie from '../components/AddMovie/AddMovie';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import { MovieState } from '../store/movie/state';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { RootState } from '../store/index';

type DispatchExts = ThunkDispatch<MovieState, void, Action>;
const middleware = [thunk];
const state: RootState = {
  movie: {
    movie: null,
    errorMessage: '',
    findMovies: true,
    loading: false,
    movies: [],
  },
};

const mockStore = configureMockStore<RootState, DispatchExts>(middleware);

describe('<AddMovie />', () => {
  let store;

  beforeEach(() => (store = mockStore(state)));

  test('render a Add Movie Component', async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <AddMovie />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('click to show Add Movie Window', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddMovie />
      </Provider>
    );
    const button = getByText(/Add/i);
    userEvent.click(button);
    expect(getByText('Add movie window')).toBeInTheDocument();
  });
});
