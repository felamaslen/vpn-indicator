/**
 * Returns a localised version of a text key
 */

import enGB from './en_GB.json';
import zhCN from './zh_CN.json';

export function getLocalisation() {
    if (typeof localStorage !== 'undefined' && localStorage) {
        const lang = localStorage.getItem('lang');

        if (lang === 'en_GB') {
            // english
            return enGB;
        }
        if (lang === 'zh_CN') {
            // chinese
            return zhCN;
        }
    }

    return enGB;
}

export default (appState, item) => {
    return appState.getIn(['lang', item]);
}

