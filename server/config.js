module.exports = () => {
    return {
        vpnTable: process.env.VPN_TABLE,
        subnetLan: process.env.SUBNET_LAN,
        toggleCmd: process.env.TOGGLE_CMD,
        webUsername: process.env.WEB_AUTH_USERNAME,
        webPassword: process.env.WEB_AUTH_PASSWORD,
        webui: {
            title: process.env.WEBUI_TITLE,
            hostname: process.env.GATEWAY_LAN
        }
    };
};

