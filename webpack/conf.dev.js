const path = require('path');
const webpack = require('webpack');

const moduleConfig = require('./module.common');
const plugins = require('./plugin.common');

module.exports = {
    devtool: 'source-map',
    entry: [
        `webpack-dev-server/client?http://0.0.0.0:${process.env.PORT_WDS}`,
        'webpack/hot/only-dev-server',
        './server/webui/index'
    ],
    output: {
        path: path.join(__dirname, 'server/static'),
        filename: 'js/bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: plugins.concat([
        new webpack.HotModuleReplacementPlugin()
    ]),
    module: moduleConfig,
    devServer: {
        stats: {
            colors: true,
            modules: false,
            chunks: false,
            reasons: true
        },
        hot: true,
        quiet: false,
        noInfo: false,
        publicPath: '/',
        port: process.env.PORT_WDS,
        proxy: {
            '/': {
                target: `http://localhost:${process.env.PORT}`,
                secure: false
            }
        }
    }
};

