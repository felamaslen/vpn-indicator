import axios from 'axios';

import buildMessage from '../lib/messageBuilder';
import {
    VPN_STATUS_RECEIVED
} from '../actions';

function respondToServerStatus(request, type) {
    return async dispatch => {
        // contact the api
        try {
            const result = await axios[type](request);

            const vpnEnabled = result.data === 'vpn';

            return dispatch(buildMessage(VPN_STATUS_RECEIVED, vpnEnabled));
        }
        catch (err) {
            const status = err.response.status;
            const message = err.response.data;

            console.warn(`Error ${status} while getting VPN status: server responded with "${message}"`);

            return dispatch(buildMessage(VPN_STATUS_RECEIVED, null));
        }
    };
}
export function getVPNStatus() {
    return respondToServerStatus('/status', 'get');
}
export function toggleVPNStatus() {
    return respondToServerStatus('/api/toggle', 'put');
}

