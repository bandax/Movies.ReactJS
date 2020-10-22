import * as React from 'react';
import { ClasificationMovie } from '../components/ClasificationMovie/ClasificationMovie';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import clasificationTypes from '../data/clasifications.json';

describe('<Footer />', () => {
  it('render a Footer Component', async () => {
    const { asFragment } = render(
      <ClasificationMovie clasificationTypes={clasificationTypes} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
