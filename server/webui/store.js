import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux-immutable';
import { Map as map } from 'immutable';

import globalReducer from './reducers';

function getStore() {
    const enhancers = [];
    const middleware = [thunk];

    if (process.env.NODE_ENV === 'dev') {
        const devToolsExtension = window.devToolsExtension;

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension);
        }
    }

    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers
    );

    const initialState = map({});

    return createStore(
        combineReducers({ appState: globalReducer }),
        initialState,
        composedEnhancers
    );
}

export default getStore;

