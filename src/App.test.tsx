import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./services/server";
import { act } from "react-dom/test-utils";

test('renders learn react link', async () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>)
  const linkElement = screen.getByText(/learn react/i);
  await act(() => {
    expect(linkElement).toBeInTheDocument();
  });
});
