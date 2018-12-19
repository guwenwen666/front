var path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = {
    entry: {
        main: './main'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
                // use:ExtractTextPlugin.extract({
                //     use:'css-loader',
                //     fallback:'style-loader'
                // })
            },
            {
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
			},
        ]
    },
    // plugins:[
    //     new ExtractTextPlugin("main.css")
    // ]
};
module.exports = config;
//相当于export default config。由于目前还没安装支持ES6的编译插件，因此不能直接使用ES6的语法