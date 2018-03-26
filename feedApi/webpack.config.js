const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env;

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


let libName = 'feed-api';
let output;
let plugins = [];

if (env === 'production') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    output = libName + '.min.js';
} 
else {
    output = libName + '.js';
}

const config = {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: output,
        library: libName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js']
    },
    plugins: plugins
};

module.exports = config;
