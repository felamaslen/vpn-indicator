import buildMessage from '../messageBuilder';
import {
    VPN_STATUS_REQUESTED,
    VPN_STATUS_RECEIVED
} from '../constants/actions';

export const vpnStatusRequested = () => buildMessage(VPN_STATUS_REQUESTED);
export const vpnStatusReceived = status => buildMessage(VPN_STATUS_RECEIVED, status);

