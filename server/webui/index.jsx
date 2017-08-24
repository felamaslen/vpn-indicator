// Client entry point

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StaticRouter, Route, Switch } from 'react-router-dom';

// all styles imported here
import './sass/index.scss';

import getStore from './store';

// react redux router object
import routes from './router';

// common components
import Header from './components/Header';

const context = {};

const switchRoutes = routes.map((route, index) => {
    const routeKey = `route${index}`;

    return <Route key={routeKey} {...route} />;
});

ReactDOM.render(
    <div>
        <Header />
        <Provider store={getStore()}>
            <StaticRouter location={window.location.pathname} context={context}>
                <Switch>
                    {switchRoutes}
                </Switch>
            </StaticRouter>
        </Provider>
    </div>,
    document.getElementById('root')
);

