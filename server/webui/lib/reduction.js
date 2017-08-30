/**
 * The initial application state is set here
 */

import { fromJS } from 'immutable';

import { getLocalisation } from '../lang/';

const localisation = getLocalisation();

export default fromJS({
    loading: false,
    lang: localisation,
    checkTimeout: 5000,
    numBadChecks: 0,
    maxTimeout: 1800000,
    vpnStatus: { text: '', type: '', status: null },
    text: {
        toggleButton: localisation.getIn(['dict', 'TOGGLE'])
    }
});

