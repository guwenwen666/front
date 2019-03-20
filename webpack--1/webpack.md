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
### devServer
* 安装 cnpm i webpack-dev-server -D
