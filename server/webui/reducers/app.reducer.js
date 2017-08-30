import { Map as map } from 'immutable';
import localise, { getLocalisation } from '../lang/';

function loadingVPNStatus(appState) {
    // could put an optimistic update here?
    return appState
        .set('loading', true)
        .set('vpnStatusText', map({
            text: 'Loading...',
            type: null
        }));
}

export function requestVPNStatus(appState) {
    // Note that the side effect to load the VPN status is initiated
    // from the action, not the reducer.
    // In redux, all reducers must be strictly pure.
    // This is in contrast to Flux, where reducers may initiate side effects.
    return loadingVPNStatus(appState);
}

export function toggleVPNStatus(appState) {
    return loadingVPNStatus(appState);
}

function getVPNStatus(appState, status) {
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

    return map({ text, type, status });
}

export function handleVPNStatus(appState, status) {
    return appState
        .set('vpnStatus', getVPNStatus(appState, status))
        .set('loading', false);
}

export function selectLanguage(appState, code) {
    const langSet = appState.set('lang', getLocalisation(code));

    const vpnStatus = getVPNStatus(
        langSet, appState.getIn(['vpnStatus', 'status'])
    );

    return langSet
        .setIn(['vpnStatus', 'text'], vpnStatus.get('text'))
        .setIn(['text', 'toggleButton'], localise(langSet, 'TOGGLE'));
}

