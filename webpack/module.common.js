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
            test: /logo\.png/,
            loader: 'file-loader',
            query: {
                name: 'assets/favicon.png',
                publicPath: '../'
            }
        },
        {
            test: filename => {
                if (filename.match(/logo\.png/)) {
                    return false;
                }
                return filename.match(/\.(woff2?|ttf|eot|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/);
            },
            loader: 'file-loader',
            query: {
                name: 'assets/[hash].[ext]',
                publicPath: '../'
            }
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: sassLoader
        }
    ]
};

