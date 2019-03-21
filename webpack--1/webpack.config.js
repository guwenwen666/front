const pathlib = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
    mode:'development',
    entry:'./src/es6.js',
    // entry:{
    //     'index':'./src/2.js',
    //     'test':'./src/2.js'
    // },
    output:{
        path:pathlib.resolve('dest/'),
        filename:'bundle.js'
        // filename:'[name].bundle.js'
    },
    // devServer:{
    //     //contentBase:pathlib.resolve('static'),
    //     port:8090
    // },
    // plugins:[
    //     new HtmlWebpackPlugin({
    //         template: './static/index.html',
    //         filename: './test.html',
    //       })
    // ],
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env']
                    }
                }
            }
        ]
    }

}