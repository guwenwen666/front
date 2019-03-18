### nodejs
#### nodejs和其他后台语言不同
1. nodejs的对象、语法和js一样
2. 性能较php、java、python还行
3. 前后台配合方便  
#### nodejs用处
1. 服务器--小型后台系统、中间层
2. 工具
 测试、构建（grunt gulp webpack）

 #### nodejs如何搭建一个web服务器
 `遵守http协议`  
 运行node程序 node xxx.js
 ```
const http = require('http');//系统模块
let server = http.createServer((req,res)=>{
    console.log('运行');
    res.write(req.url);
    res.write(req.method);
    res.end();
})
server.listen(8080);
 ```

 * nodejs处理并发吗？   
 nodejs和js一样 单线程 单进程   
 #### 好处
 1.安全 2.性能高 3.前后台交互方便
 