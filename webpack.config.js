const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target:'web',
    entry:path.join(__dirname,"src/index.js"),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.js$/,
                loader:'babel-loader'
            },
            {
                test:/\.css/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new Webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:'./index.html'
        }),
        
    ]
}

if(isDev){
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        hot:true,
        proxy:{
            '/api':'http://127.0.0.1:4000'
        }
    };
    config.plugins.push(
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoEmitOnErrorsPlugin(),
    )
}

module.exports = config;