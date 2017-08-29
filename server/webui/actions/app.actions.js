import buildMessage from '../lib/messageBuilder';
import {
    VPN_STATUS_REQUESTED,
    VPN_STATUS_TOGGLED,
    VPN_STATUS_RECEIVED,
    LANGUAGE_SELECTED
} from './';

import { getVPNStatus, toggleVPNStatus } from '../effects/app.effects';

import { setLanguage } from '../lang';

export function vpnStatusRequested() {
    return dispatch => {
        // side effect for getting the status from the server
        getVPNStatus()(dispatch);

        return dispatch(buildMessage(VPN_STATUS_REQUESTED));
    }
}

export function vpnStatusToggled() {
    return dispatch => {
        // side effect for toggling the status on the server
        toggleVPNStatus()(dispatch);

        dispatch(buildMessage(VPN_STATUS_TOGGLED));
    };
}

export function vpnStatusReceived(status) {
    return dispatch => {
        return dispatch(buildMessage(VPN_STATUS_RECEIVED, status));
    };
}

export function languageSelected(code) {
    // side effect: set the language in local storage
    setLanguage(code);

    return dispatch => {
        return dispatch(buildMessage(LANGUAGE_SELECTED, code));
    };
}

