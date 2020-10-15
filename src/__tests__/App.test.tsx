import * as React from 'react';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { App } from '../components/App';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { RootState } from '../store/index';
import { MovieState } from '../store/movie/state';
import configureMockStore from 'redux-mock-store';
import { Action } from 'redux';
import { Provider } from 'react-redux';

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

describe('<App />', () => {
  let store;

  beforeEach(() => (store = mockStore(state)));

  it('should display a default app component', async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const fragment = asFragment();

    expect(fragment).toMatchSnapshot();
  });
});
