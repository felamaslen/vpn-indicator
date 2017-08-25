/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;

process.env.PORT = 8001;

const app = require('../server/api/app');

class TestReq {
}
class TestRes {
    constructor() {
        this.statusCode = 200;
        this.body = null;
    }
    status(code) {
        this.statusCode = code;

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
        const res = await app.statusRoute(new TestReq(), new TestRes());

        if (res.statusCode === 200) {
            expect(res.body).to.be.oneOf(['vpn', 'novpn']);
        }
        else {
            expect(res.statusCode).to.be.equal(500);
            expect(res.body).to.be.oneOf(serverPlatformErrorMessages);
        }
    });

    it('should expose a route to toggle the VPN status', async() => {
        const res = await app.toggleRoute(new TestReq(), new TestRes());

        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.oneOf(['vpn', 'novpn']);
    });

    it('should run a web server', async () => {
        const srv = await app.server();

        expect(srv).to.be.an('object');
        expect(srv.port).to.be.equal(process.env.PORT);
        expect(srv.app).to.be.ok;
    });
});

