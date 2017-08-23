/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;

const app = require('../server/app');

class TestReq {
}
class TestRes {
    constructor() {
        this.status = 200;
        this.body = null;
    }
    status(code) {
        this.status = code;

        return this;
    }
    end(body) {
        this.body = body;

        return this;
    }
}

const serverPlatformErrorMessages = [
    'MacOS not implemented yet on the server',
    'Unknown server operating system'
];

describe('Server app', () => {
    it('should find the operating system running on the server', async() => {
        try {
            const platform = await app.getOS();

            expect(platform).to.be.oneOf(['linux', 'mac']);
        }
        catch (err) {
            expect(err.message).to.be.equal('unknown os');
        }
    });

    it('should check if the default gateway is set', async() => {
        try {
            const defaultIsTunnel = await app.isVPNDefaultGateway();

            expect(defaultIsTunnel).to.be.oneOf([true, false]);
        }
        catch (err) {
            expect(err.message).to.be.oneOf(serverPlatformErrorMessages);
        }
    });

    it('should return a status dependent on the gateway status', () => {
        expect(app.statusResult(true)).to.be.equal('vpn');
        expect(app.statusResult(false)).to.be.equal('novpn');
    });

    it('should expose a route with the VPN status', async() => {
        const res = await app.route(new TestReq(), new TestRes());

        if (res.status === 200) {
            expect(res.body).to.be.oneOf(['vpn', 'novpn']);
        }
        else {
            expect(res.status).to.be.equal(500);
            expect(res.body).to.be.oneOf(serverPlatformErrorMessages);
        }
    });

    it('should run a web server', async () => {
        const srv = await app.server();

        expect(srv).to.be.an('object');
        expect(srv.port).to.be.equal(process.env.PORT);
        expect(srv.app).to.be.ok;
    });
});

