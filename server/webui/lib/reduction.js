/**
 * The initial application state is set here
 */

import { fromJS } from 'immutable';

import { getLocalisation } from '../lang/';

export default fromJS({
    lang: getLocalisation(),
    vpnStatusText: ''
});

