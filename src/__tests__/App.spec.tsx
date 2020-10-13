import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../components/App';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

describe('<App />', () => {
  test('should display a default app component', async () => {
    const { getByText } = render(<App />);
    screen.debug();
    const app = getByText('Testing');
    expect(app).toBeDefined();
  });
});
