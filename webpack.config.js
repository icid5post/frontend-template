const config = require('./config.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackConfig = {
    entry: [
        './src/js/app.js',
    ],

    output: {
        path: __dirname,
        filename: '[name].bundle.js',
        publicPath: '/assets/js/',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    compact: true
                }
            }
        ]
    },

    resolve: {
        modules: ['./src/js', 'node_modules']
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    devtool: 'eval',
};

if (!global.isDev) {
    webpackConfig.devtool = config.prodmaps ? 'source-map' : false;
    webpackConfig.plugins = [
        new UglifyJsPlugin({
            sourceMap: config.prodmaps,
            uglifyOptions: {
                warnings: false,
                drop_console: false,
                ie8: false,
                unsafe: true,
                ecma: 8,
                output: {
                    comments: false
                }
            }
        })
    ];
}

module.exports = webpackConfig;
