// Client entry point

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import getConfig from '../config';
const config = getConfig().webui;

// all styles imported here
import './sass/index.scss';

import getStore from './store';

// main app container component
import App from './containers/App';

// common components
import Header from './components/Header';

ReactDOM.render(
    <div className="container">
        <Header title={config.title} />
        <Provider store={getStore()}>
            <App />
        </Provider>
    </div>,
    document.getElementById('root')
);

