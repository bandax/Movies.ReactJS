import * as React from 'react';
import { NotFound } from '../components/NotFound/NotFound';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('<NotFound />', () => {
  it('render a Header Component', async () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
