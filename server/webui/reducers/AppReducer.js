import { formatVPNStatus } from '../lang';

export function requestVPNStatus(reduction) {
    return reduction; // TODO
}

export function handleVPNStatus(reduction, status) {
    return reduction
        .setIn(['appState', 'vpnStatusText'], formatVPNStatus(status));
}

