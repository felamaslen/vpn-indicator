import { combineReducers } from 'redux';

import indexPage from './IndexReducer';

// Note: each of the properties in the object passed to
// combineReducers will be inserted into the main
// state object of the app
const globalReducer = combineReducers({
    indexPage
});

export default globalReducer;

