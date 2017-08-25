import { formatVPNStatus } from '../lang';

export function requestVPNStatus(reduction) {
    // TODO: side effect for requesting VPN status
    return reduction;
}

export function handleVPNStatus(reduction, status) {
    return reduction
        .setIn(['appState', 'vpnStatusText'], formatVPNStatus(status));
}

