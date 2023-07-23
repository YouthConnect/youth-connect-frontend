import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import App from '../App';

describe('<App />', () => {
  it('has home screen and title', async () => {
    render(<App />);

    let home = await screen.findByTestId('HOME');
    let title = await screen.findByTestId('HOME TITLE');

    expect(home).toBeDefined();
    expect(title).toBeDefined();
    expect(title.children[0]).toEqual('Welcome to Youth Connect! ');
  });

  it('has login form', async () => {
    render(<App />);
    let loginButton = await screen.findByText('Log in');
    expect(loginButton).toBeDefined();
  });

  it('loads login form on button press', async () => {
    render(<App />);
    let loginButton = await screen.findByText('Log in');
    fireEvent.press(loginButton);

    let login = await screen.findByTestId('LOGIN');
    let loginForm = await screen.findByTestId('LOGIN FORM');
    expect(login).toBeDefined();
    expect(loginForm).toBeDefined();
  });
});
