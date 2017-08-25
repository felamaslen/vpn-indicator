import buildMessage from '../messageBuilder';
import {
    VPN_STATUS_RECEIVED
} from '../actions';

function getStatusFromAPI() {
    // TODO: actually get the status using an HTTP request
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 200);
    });
}

export function initiateVPNStatusRequest() {
    return async dispatch => {
        // contact the api
        const result = await getStatusFromAPI();

        return dispatch(buildMessage(VPN_STATUS_RECEIVED, result));
    };
}

