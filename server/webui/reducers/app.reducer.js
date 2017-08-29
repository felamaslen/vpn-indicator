import { Map as map } from 'immutable';
import localise from '../lang/';

export function requestVPNStatus(appState) {
    // could put an optimistic update here?
    return appState.set('loading', true);
}

export function toggleVPNStatus(appState) {
    return appState.set('loading', true);
}

function getVPNStatusText(appState, status) {
    let type = null;
    let text = null;

    if (status === true) {
        text = localise(appState, 'VPN_STATUS_ON');
        type = 'on';
    }
    else if (status === false) {
        text = localise(appState, 'VPN_STATUS_OFF');
        type = 'off';
    }
    else {
        text = localise(appState, 'VPN_STATUS_UNKNOWN');
        type = 'unknown';
    }

    return map({ text, type });
}

export function handleVPNStatus(appState, status) {
    return appState
        .set('vpnStatusText', getVPNStatusText(appState, status))
        .set('loading', false);
}

