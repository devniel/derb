var webpack = require('webpack');
var path = require('path');
var hotMiddlewareScript = 'webpack-hot-middleware/client';
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'index' : [
            'react-hot-loader/patch',
            './app/index.dev.js', 
            hotMiddlewareScript
        ]
    },

    output: {
        path: path.resolve(__dirname, './public/dist'),
        publicPath: "/dist",
        filename: '[name].js',
        sourceMapFilename : '[name].map'
    },
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use : [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets : ["es2015", "react"],
                            plugins : [
                                "react-hot-loader/babel",
                                ["transform-es2015-arrow-functions", { "spec": true }],
                                ["transform-class-properties", { "spec": true }]    
                            ]
                        }
                    }
                ]
            },
            {   
                test: /\.css$/, 
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.pcss$|\.scss$/,
                loader : 'style-loader!css-loader!postcss-loader?parser=postcss-scss'
            },

            {
                test: /\.jpe?g$|\.gif$|\.png$/i,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['manifest'], // Specify the common bundle's name.
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),

        new webpack.SourceMapDevToolPlugin({
            filename: '[name].map',
            columns: false
        }),

        new webpack.HotModuleReplacementPlugin(),
        
        new HtmlWebpackPlugin({
            title : "toqr",
            filename : "index.html",
            template : "./views/index.ejs",
            minify : false
        })

    ]
};