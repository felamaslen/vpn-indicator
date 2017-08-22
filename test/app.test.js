const expect = require('chai').expect;

const app = require('../server/app');

describe('Server app', () => {
    it('should check if the default gateway is set', () => {
        app.isVPNDefaultGateway()
            .then(defaultIsTunnel => {
                expect(defaultIsTunnel).to.be.oneOf([true, false]);
            });
    });

    it('should return a status dependent on the gateway status', () => {
        expect(app.statusResult(true)).to.be.equal('vpn');
        expect(app.statusResult(false)).to.be.equal('novpn');
    });
});

