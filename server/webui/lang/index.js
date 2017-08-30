/**
 * Returns a localised version of a text key
 */

import { Map as map, List as list } from 'immutable';

import enGB from './en_GB.json';
import zhCN from './zh_CN.json';
import jpJP from './jp_JP.json';

export const languages = list([
    map({
        name: 'English (UK)',
        code: 'en_GB',
        dict: map(enGB)
    }),
    map({
        name: '中文',
        code: 'zh_CN',
        dict: map(zhCN)
    }),
    map({
        name: '日本語',
        code: 'jp_JP',
        dict: map(jpJP)
    })
]);

export function setLanguage(code) {
    // side effect to set the app language
    try {
        localStorage.setItem('lang', code);
    }
    catch (err) {
        console.warn('[ERROR] localStorage not supported; localisation not persistent');
    }
}

export function getLanguage() {
    return localStorage.getItem('lang');
}

export function getLocalisation(theCode) {
    let code = theCode;

    try {
        if (!code) {
            code = getLanguage();
        }

        const lang = languages.filter(item => item.get('code') === code);

        if (lang.size !== 1) {
            throw new Error('Invalid language');
        }

        return lang.get(0);
    }
    catch (err) {
        // maybe put a warning here?
        return languages.get(0);
    }
}

export default (appState, item) => {
    if (!appState) {
        return languages.getIn([0, 'dict', item]);
    }

    return appState.getIn(['lang', 'dict', item]);
}

