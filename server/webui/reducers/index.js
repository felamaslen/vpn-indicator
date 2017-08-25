import { createReducer } from 'redux-create-reducer';

import {
    VPN_STATUS_REQUESTED,
    VPN_STATUS_RECEIVED
} from '../constants/actions';

import {
    requestVPNStatus,
    handleVPNStatus
} from './AppReducer';

import initialReduction from '../reduction';

function createReducerObject(array) {
    return array.reduce((last, item) => {
        last[item[0]] = (reduction, action) => item[1](reduction, action.payload);

        return last;
    }, {});
}

// map actions to reducers
const reducers = createReducerObject([
    [VPN_STATUS_REQUESTED, requestVPNStatus],
    [VPN_STATUS_RECEIVED, handleVPNStatus]
]);

export default createReducer(initialReduction, reducers);

