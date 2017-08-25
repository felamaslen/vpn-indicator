import axios from 'axios';

import buildMessage from '../messageBuilder';
import {
    VPN_STATUS_RECEIVED
} from '../actions';

export function getVPNStatus() {
    return async dispatch => {
        // contact the api
        try {
            const result = await axios.get('/status');

            const vpnEnabled = result === 'vpn';

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

