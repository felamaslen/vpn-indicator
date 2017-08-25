/**
 * Returns webpack configuration objects
 */

require('dotenv').config();

const webpackConfigDevelopment = require('./webpack/conf.dev');
const webpackConfigProduction = require('./webpack/conf.prod');

function webpackConfig() {
    if (process.env.NODE_ENV !== 'dev') {
        return webpackConfigProduction;
    }

    return webpackConfigDevelopment;
}

module.exports = webpackConfig();

