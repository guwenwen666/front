## webpack [简书](https://www.jianshu.com/p/dce4e36b4204 "webpack优点")
### 安装wepack与webpack-dev-server
* 安装node.js 和 npm
* 初始化配置  
*npm init*  ==>生成package.json文件夹
* 本地安装webpack  
*npm install webpack -D*
* 安装webpack-dev-server,他可以在开发环境中提供很多服务，比如启动一个服务器、热更新、接口代理等  
*npm install webpack-dev-server -D*

### webpack配置
weppack就是一个js配置文件
* 创建一个js文件：webpack.config.js并初始化它的内容

```
var config ={};  
module.exports = config;//相当于export default config。由于目前还没安装支持ES6的编译插件，因此不能直接使用ES6的语法
```
* 在package.json的scripts里增加一个快速启动webpack-dev-server服务的脚本
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev":"webpack-dev-server --open --config webpack.config.js"
  },//--config指向webpack-dev-server读取的配置文件路径，这里直接读取webpack.config.js，--open执行时自动在浏览器打开页面
```
**配置问题**  
1.the 'mode' option has not been set  
解决方法：指定是开发环境还是生产环境
"dev": "webpack --mode development",  
"build": "webpack --mode production"
  
    
### 配置入口（entry）出口（output）
* 入口：webpack从哪里开始找依赖、并且编译  
* 出口：配置编译后的文件存储位置和文件名  
新建一个main.js作为入口文件，然后再webpack.config.js中进行入口和输出配置
```
var path = require('path');//node学习
var config ={
    entry:{
        main:'./main'
    },
    output:{
        path:path.join(__dirname,'./dist'),
        publicPath:'/dist/',
        filename:'main.js'
    }
};
module.exports = config;
```

### 在webpack的中，每个文件都是一个模块，比如css、js、html、.jpg、.less等，对于不同的模块需要不同的加载器 loader来处理 
* style-loader  css-loader   
npm  install style-loader   -D  
npm  install css-loader   -D
```
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
            },
        ]
    }
```
**当webpack编译过程中遇到require()或import语句导入一个后缀为.css的文件时，先将它通过css-loader转换，再通过style-loader转换,然后继续打包**

 css通过javascript动态创建style标签来写入，这个意味着样式代码都编译在main.js里（太占体积，还不能做缓存)

*  extract-text-webpack-plugin 把css提取出来，生成一个main.css文件，之后在index.html里通过link加载  
*npm install  extract-text-webpack-plugin -D *
```
//导入插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
```
```
//使用插件
use:ExtractTextPlugin.extract({
    use:'css-loader',
    fallback:'style-loader'
})
```
```
//重新命名文件
plugins:[
    new ExtractTextPlugin("main.css")
]
```