import { expect } from 'chai';
import initialReduction from '../../server/webui/lib/reduction';

import {
    requestVPNStatus,
    handleVPNStatus
} from '../../server/webui/reducers/app.reducer';

describe('App', () => {
    describe('reducers', () => {
        describe('requestVPNStatus', () => {
            it('should do nothing', () => {
                expect(requestVPNStatus(initialReduction)).to.be.equal(initialReduction);
            });
        });

        describe('handleVPNStatus', () => {
            it('should set vpnStatusText to something', () => {
                const statusText = [true, false, null].map(status => handleVPNStatus(initialReduction, status));

                expect(statusText[0].get('vpnStatusText')).to.be.a('string').lengthOf.greaterThan(0);
                expect(statusText[1].get('vpnStatusText')).to.be.a('string').lengthOf.greaterThan(0);
                expect(statusText[2].get('vpnStatusText')).to.be.a('string').lengthOf.greaterThan(0);
            });
        });
    });
});
