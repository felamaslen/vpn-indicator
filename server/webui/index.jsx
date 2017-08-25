// Client entry point

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// all styles imported here
import './sass/index.scss';

import getStore from './lib/store';

// main app container component
import App from './containers/App';

ReactDOM.render(
    <div className="jumbotron">
        <Provider store={getStore()}>
            <App />
        </Provider>
    </div>,
    document.getElementById('root')
);

