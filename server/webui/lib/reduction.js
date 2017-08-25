/**
 * The initial application state is set here
 */

import { fromJS } from 'immutable';

import { formatVPNStatus } from './lang';

export default fromJS({
    vpnStatusText: formatVPNStatus(null)
});

