const expect = require('chai').expect;

require('dotenv')();
const config = require('../server/config')();

describe('Configuration', () => {
    it('should be an object', () => {
        expect(config).to.be.an('object');
    });

    it('should define vpnTable', () => {
        expect(config.vpnTable).to.be.a('string').lengthOf.greaterThan(0);
    });
    it('should define subnetLan', () => {
        expect(config.subnetLan).to.be.a('string').lengthOf.greaterThan(0);
    });
    it('should define toggleCmd', () => {
        expect(config.toggleCmd).to.be.a('string').lengthOf.greaterThan(0);
    });
    it('should define webUsername', () => {
        expect(config.webUsername).to.be.a('string').lengthOf.greaterThan(0);
    });
    it('should define webPassword', () => {
        expect(config.webPassword).to.be.a('string').lengthOf.greaterThan(0);
    });
});

