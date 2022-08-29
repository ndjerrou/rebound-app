import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import Routes from '../router/Routes';

test('renders learn react link', () => {
  const { getByText } = render(
    <Router>
      <Routes />
    </Router>,
  );
  const linkElement = getByText(/lookbook/i);
  expect(linkElement).toBeInTheDocument();
});
