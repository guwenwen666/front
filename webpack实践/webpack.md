### webpack
## 什么是Webpack
* WebPack可以看做是`模块打包机`：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言，并将其转换和打包为合适的格式供浏览器使用。

## Webpack作用
* webpack 的作用就是处理依赖，编译，打包文件，管理插件。

## webpack使用
* 安装cnpm i -g webpack
* 编写配置
默认：webpack.config.js
改了 webpack --config xxx
* 单入口
```
const pathlib = require('path');
module.exports={
    entry:'./src/1.js',
    output:{
        path:pathlib.resolve('dest/'),
        filename:'bundle.js'
    }
}
```
* 多入口
```
const pathlib = require('path');
module.exports={
    entry:{
        'index':'./src/2.js',
        'test':'./src/2.js'
    },
    output:{
        path:pathlib.resolve('dest/'),
        filename:'[name].bundle.js'
    }
}
```
### devServer 相当于webpack+服务器
* 安装 cnpm install --save webpack-dev-server
```
    devServer:{
        contentBase:pathlib.resolve('static'),
        port:8090
    },
```

`注意：你启动webpack-dev-server后，你在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了内存当中`  

### 插件 ---HtmlWebpackPlugin  
* 安装 cnpm install --save  html-webpack-plugin
```
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
    plugins:[
        new HtmlWebpackPlugin({
            template: './static/index.html',
            filename: './test.html',
          })
    ],
```

### Loader --babel-loader
* 安装 cnpm install --save babel-loader babel-core babel-preset-env  
 babel-loader 给webpack用的  
 babel-core  babel核心库  
 babel-preset-env  环境预设
 ```
    module:{
        rules:[
             {
                 test: /\.js$/, 
                 use: 'babel-loader', 
                 exclude: /node_modules/
                }
            
        ]
    }
 ```
 

