import chai from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);
const expect = chai.expect;

import itEach from 'it-each';

import { Map as map } from 'immutable';

import appState from '../../server/webui/lib/reduction';

import {
    requestVPNStatus,
    toggleVPNStatus,
    handleVPNStatus,
    selectLanguage
} from '../../server/webui/reducers/app.reducer';

import enGB from '../../server/webui/lang/en_GB.json';
import zhCN from '../../server/webui/lang/zh_CN.json';

const localisation = { enGB, zhCN };

itEach({ testPerIteration: true });

describe('App', () => {
    describe('reducers', () => {
        describe('requestVPNStatus', () => {
            it('should set loading status', () => {
                expect(requestVPNStatus(appState).get('loading')).to.equal(true);
            });
        });

        describe('handleVPNStatus', () => {
            it('should unset loading status', () => {
                expect(handleVPNStatus(appState).get('loading')).to.equal(false);
            });

            it.each(
                [
                    { lang: 'enGB' },
                    { lang: 'zhCN' }
                ],
                'should set vpnStatusText localised to %s',
                ['lang'],
                lang => {
                    const appStateLocalised = appState.set('lang', localisation[lang]);

                    const statusText = [true, false, null].map(
                        status => handleVPNStatus(appStateLocalised, status)
                    );

                    expect(statusText[0].getIn(['vpnStatus', 'text']))
                        .to.equal(lang.VPN_STATUS_ON);
                    expect(statusText[1].getIn(['vpnStatus', 'text']))
                        .to.equal(lang.VPN_STATUS_OFF);
                    expect(statusText[2].getIn(['vpnStatus', 'text']))
                        .to.equal(lang.VPN_STATUS_UNKNOWN);

                    expect(statusText[0].getIn(['vpnStatus', 'type']))
                        .to.equal('on');
                    expect(statusText[1].getIn(['vpnStatus', 'type']))
                        .to.equal('off');
                    expect(statusText[2].getIn(['vpnStatus', 'type']))
                        .to.equal('unknown');
                }
            );
        });

        describe('toggleVPNStatus', () => {
            it('should set loading status', () => {
                expect(toggleVPNStatus(appState).get('loading')).to.equal(true);
            });
        });

        describe('selectLanguage', () => {
            it('should set the language', () => {
                expect(selectLanguage(appState, 'zh_CN').get('lang')).to.equal(map({
                    code: 'zh_CN',
                    name: '中文',
                    dict: map(zhCN)
                }));
            });

            it.each([
                { text: zhCN.VPN_STATUS_UNKNOWN, status: null, type: 'Unknown' },
                { text: zhCN.VPN_STATUS_ON, status: true, type: 'On' },
                { text: zhCN.VPN_STATUS_OFF, status: false, type: 'Off' }
            ], 'should set VPN status text (%s)', ['type'], elem => {

                expect(
                    selectLanguage(handleVPNStatus(appState, elem.status), 'zh_CN')
                        .getIn(['vpnStatus', 'text'])
                )
                    .to.equal(elem.text);
            });
        });
    });
});
