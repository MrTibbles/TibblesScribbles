var
    webpack = require('webpack'),
    path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client',
        __dirname + '/src/index'
    ],
    output: {
        path: '/',
        filename: 'jaak-bundle.js',
        publicPath: 'http://localhost:3000/js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015', 'react-hmre']
            }
        }]
    }
};
