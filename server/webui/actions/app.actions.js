import buildMessage from '../lib/messageBuilder';
import {
    VPN_STATUS_REQUESTED,
    VPN_STATUS_RECEIVED
} from './';

import { getVPNStatus } from '../effects/app.effects';

export function vpnStatusRequested() {
    return dispatch => {
        // side effect for getting the status from the server
        getVPNStatus()(dispatch);

        return dispatch(buildMessage(VPN_STATUS_REQUESTED));
    }
}

export function vpnStatusReceived(status) {
    return dispatch => {
        return dispatch(buildMessage(VPN_STATUS_RECEIVED, status));
    }
}

