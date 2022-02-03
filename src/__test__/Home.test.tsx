import React from 'react';
import {createMemoryHistory} from "history"
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../component/Home';
import { Router } from 'react-router-dom';

test('title test', () => {
    render(<Home/>);
    const title = screen.queryByTestId("title");
      expect(title?.textContent).toBe("Search Country Information");
  });

  test('button Disable', () => {
    render(<Home/>);
      const button = screen.queryByTestId("button");
      expect(button).toBeDisabled();
 
  }); 

  test('button Enable', () => {
    render(<Home/>);
    const chkInput:any = screen.queryByPlaceholderText("Enter Country Name");
    fireEvent.change(chkInput,{target:{value:"Bangladesh"}})
    const button = screen.queryByTestId("button");
      expect(button).toBeEnabled();
 
  }); 

  test('update on change', () => {
    render(<Home/>);
    const chkInput:any = screen.queryByPlaceholderText("Enter Country Name");
      fireEvent.change(chkInput,{target:{value:"Bangladesh"}})
      expect(chkInput.value).toBe("Bangladesh")
  }); 

  test('Country details routing', () => {

    const history = createMemoryHistory({ initialEntries: ['/'] });
    const screen = render(
      <Router history={history}>
        <Home/>
      </Router>
    );

    const chkInput:any = screen.queryByPlaceholderText("Enter Country Name");
    fireEvent.change(chkInput,{target:{value:"Bangladesh"}})
    const button: any = screen.queryByTestId("button");

    expect(history.location.pathname).toBe('/');
    fireEvent.click(button);
    expect(history.location.pathname).toBe('/CountryDetails/Bangladesh');

  }); 


  