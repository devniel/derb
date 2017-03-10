var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    devtool: 'cheap-module-source-map',

    entry: {
        'index' : [
            './app/index'
        ]
    },

    output: {
        path: path.resolve(__dirname, './public/dist'),
        publicPath: "/dist",
        filename: '[hash].[name].js',
        sourceMapFilename : '[hash].[name].map'
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

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            names: ['manifest'], // Specify the common bundle's name.
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings: false
            },
            comments: false
        }),

        new HtmlWebpackPlugin({
            title : "DERB",
            filename : "index.html",
            template : "./views/index.ejs",
            minify : false
        })

    ]
};