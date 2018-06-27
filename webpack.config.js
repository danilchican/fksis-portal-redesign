const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('css/[name].css');

module.exports = {
    entry: {
        'app': './src/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader', // translates CSS into CommonJS modules
                        options: {
                            url: false,
                            minimize: true,
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }]
                }),
            }
        ]
    },
    plugins: [
        extractCSS
    ]
};