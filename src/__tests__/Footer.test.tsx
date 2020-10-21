import * as React from 'react';
import { Footer } from '../components/Footer/Footer';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('<Footer />', () => {
  it('render a Footer Component', async () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
