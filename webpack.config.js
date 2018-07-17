const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DeleteFilesOrFoldersWebpackPlugin = require('./webpack_plugins/deleteFilesOrFoldersWepbackPlugin');

const extractCSS = new ExtractTextPlugin('css/[name].css');
const extractImages = new CopyWebpackPlugin([{
    from: 'src/images',
    to: path.resolve(__dirname, 'build/images'),
    toType: 'dir'
}]);
const extractHTML = new CopyWebpackPlugin([{
    from: './src/*.html',
    to: path.resolve(__dirname, 'build/[name].[ext]'),
    toType: 'template'
}]);

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
                        loader: 'css-loader' // translates CSS into CommonJS modules
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
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader?limit=10&name=../images/[name].[ext]"
            }
        ]
    },
    plugins: [
        extractCSS,
        extractImages,
        extractHTML,
        new DeleteFilesOrFoldersWebpackPlugin({root: __dirname, include: ['images']})
    ]
};