import { createReducer } from 'redux-create-reducer';

import {
    VPN_STATUS_REQUESTED,
    VPN_STATUS_TOGGLED,
    VPN_STATUS_RECEIVED,
    LANGUAGE_SELECTED
} from '../actions';

import {
    requestVPNStatus,
    toggleVPNStatus,
    handleVPNStatus,
    selectLanguage
} from './app.reducer';

import initialReduction from '../lib/reduction';

function createReducerObject(array) {
    return array.reduce((last, item) => {
        last[item[0]] = (appState, action) => item[1](appState, action.payload);

        return last;
    }, {});
}

// map actions to reducers
const reducers = createReducerObject([
    [VPN_STATUS_REQUESTED, requestVPNStatus],
    [VPN_STATUS_TOGGLED, toggleVPNStatus],
    [VPN_STATUS_RECEIVED, handleVPNStatus],
    [LANGUAGE_SELECTED, selectLanguage]
]);

export default createReducer(initialReduction, reducers);

