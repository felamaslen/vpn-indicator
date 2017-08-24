import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import globalReducer from './reducers';

function getInitialState() {
    // initial state of the app
    return {};
}

function getStore() {
    const initialState = getInitialState();
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

    const store = createStore(
        globalReducer,
        initialState,
        composedEnhancers
    );

    return store;
}

export default getStore;

