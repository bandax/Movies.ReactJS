import * as React from 'react';
import { SortMovie } from '../components/SortMovie/SortMovie';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import sortOptions from '../data/sorts.json';

describe('<Footer />', () => {
  it('render a Footer Component', async () => {
    const { asFragment } = render(<SortMovie sortOptions={sortOptions} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
