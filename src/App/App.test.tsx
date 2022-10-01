import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import store from 'store';

import { App } from './App';

test('renders THMOON header', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
    const thmoon = screen.getByText(/THMOON/i);
    expect(thmoon).toBeInTheDocument();
});
