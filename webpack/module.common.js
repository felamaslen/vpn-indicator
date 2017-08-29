const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoader = ExtractTextPlugin.extract(
    'css-loader!sass-loader'
);

const jsxLoader = {
    loader: 'babel-loader',
    options: {
        presets: ['env']
    }
};

module.exports = {
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: jsxLoader
        },
        {
            test: /\.(woff2?|ttf|eot|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=./css/[hash].[ext]'
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: sassLoader
        }
    ]
};

