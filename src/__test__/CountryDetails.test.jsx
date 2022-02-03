import React from 'react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from "history"
import { fireEvent, render, screen } from '@testing-library/react';
import CountryDetails from '../component/CountryDetails';

test('renders country Info', () => {
    const history = createMemoryHistory();
      history.push("/CountryDetails/name");

   render(<Router history={history}>
           <CountryDetails/>
         </Router>);

  const details = screen.getByTestId("details");
  expect(details).toBeInTheDocument();
});




