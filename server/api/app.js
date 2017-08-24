const os = require('os');
const exec = require('child_process').exec;
const iprule = require('iproute').rule;
const path = require('path');
const express = require('express');
const basicAuth = require('express-basic-auth');

require('dotenv').config();
const config = require('./config')();

function getOS() {
    const platform = os.platform();

    if (platform === 'linux') {
        return Promise.resolve('linux');
    }

    if (platform === 'darwin') {
        return Promise.resolve('mac');
    }

    return Promise.reject(new Error('unknown os'));
}

function isVPNDefaultGatewayLinux() {
    return new Promise((resolve, reject) => {
        iprule.show((err, rules) => {
            if (err) {
                return reject(err);
            }

            const tunnelIndex = rules.findIndex(
                rule => rule.from === config.subnetLan && rule.lookup === config.vpnTable
            );

            const lanIndex = rules.findIndex(
                rule => rule.from === config.subnetLan
            );

            const defaultIsTunnel = tunnelIndex <= lanIndex && tunnelIndex !== -1;

            return resolve(defaultIsTunnel);
        });
    });
}

async function isVPNDefaultGateway() {
    const platform = await getOS();

    if (platform === 'linux') {
        const gatewayStatus = await isVPNDefaultGatewayLinux();

        return gatewayStatus;
    }

    if (platform === 'mac') {
        throw new Error('MacOS not implemented yet on the server');
    }

    throw new Error('Unknown server operating system');
}

function statusResult(gatewayStatus) {
    return gatewayStatus
        ? 'vpn'
        : 'novpn';
}

async function statusRoute(req, res) {
    try {
        const gatewayStatus = await isVPNDefaultGateway();

        const result = statusResult(gatewayStatus);

        return res.end(result);
    }
    catch (err) {
        return res.status(500).end(err.message);
    }
}

function toggleRoute(req, res) {
    return new Promise((resolve, reject) => {
        exec(config.toggleCmd, (err, stdout) => {
            if (err) {
                reject(res.status(500).end(err.message));
            }

            const newStatus = stdout.match(/^Enabling/)
                ? 'vpn'
                : 'novpn';

            resolve(res.end(newStatus));
        });
    });
}

function server() {
    const app = express();

    app.get('/status', statusRoute);

    // serve the web UI at /
    app.use(express.static(path.join(__dirname, '../static')));

    app.use('/api', basicAuth({
        users: { [config.webUsername]: config.webPassword },
        challenge: true,
        realm: 'vpnIndicator99svv912'
    }));

    app.put('/api/toggle', toggleRoute);

    // catch 404 errors
    app.use((req, res) => res.status(404).end('not found'));

    const port = process.env.PORT || 8000;

    return new Promise(resolve => {
        app.listen(port, () => {
            resolve({ app, port });
        });
    });
}

module.exports = {
    getOS,
    isVPNDefaultGateway,
    statusResult,
    statusRoute,
    toggleRoute,
    server
};