import localise from '../lang/';

export function requestVPNStatus(appState) {
    // could put an optimistic update here?
    return appState.set('loading', true);
}

export function toggleVPNStatus(appState) {
    return appState.set('loading', true);
}

function getVPNStatusText(appState, status) {
    if (status === true) {
        return localise(appState, 'VPN_STATUS_ON');
    }
    if (status === false) {
        return localise(appState, 'VPN_STATUS_OFF');
    }

    return localise(appState, 'VPN_STATUS_UNKNOWN');
}

export function handleVPNStatus(appState, status) {
    return appState
        .set('vpnStatusText', getVPNStatusText(appState, status));
}

