const path = require('path');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const moduleConfig = require('./module.common');
const plugins = require('./plugin.common');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        './server/webui/index'
    ],
    output: {
        path: path.join(__dirname, '../server/static'),
        filename: 'js/bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                'dead_code': true,
                'drop_debugger': true,
                conditionals: true,
                unused: true,
                'if_return': true
            },
            mangle: {
                toplevel: true
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessorOptions: { discardComments: { removeAll: true } }
        })
    ]),
    module: moduleConfig,
    bail: true
};

