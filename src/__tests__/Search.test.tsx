import * as React from 'react';
import { Search } from '../components/Search/Search';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('<Search />', () => {
  test('render a Search Component', async () => {
    const { asFragment } = render(<Search />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('type a text to search', async () => {
    const { getByRole } = render(<Search />);
    const input = getByRole('textbox');
    userEvent.type(input, 'Fifty');
    expect(input).toHaveValue('Fifty');
  });

  test('click search button to redirect search page with text included', async () => {
    const { getByText, getByRole } = render(<Search />);
    const input = getByRole('textbox');
    const link = getByText('Search');
    userEvent.type(input, 'Fifty');
    expect(input).toHaveValue('Fifty');
    expect(link.closest('a')).toHaveAttribute('href', '#/search/Fifty');
  });
});
