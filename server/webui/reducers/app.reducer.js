import { formatVPNStatus } from '../lang';

export function requestVPNStatus(appState) {
    // could put an optimistic update here?
    return appState;
}

export function handleVPNStatus(appState, status) {
    return appState
        .set('vpnStatusText', formatVPNStatus(status));
}

