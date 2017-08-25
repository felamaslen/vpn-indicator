/**
 * Functions to output text
 * This can be extended for e.g. localisation
 */

function formatText(message) {
    return message.toString();
}

export function formatVPNStatus(status) {
    // status can be one of true, false, or null
    if (status) {
        return formatText('VPN is connected and set as the default gateway');
    }

    if (status === false) {
        return formatText('VPN is not set as the default gateway');
    }

    return formatText('VPN is in an unknown state');
}

