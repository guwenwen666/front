const http = require('http');//系统模块
let server = http.createServer((req,res)=>{
    console.log('运行');
    res.write(req.url);
    res.write(req.method);
    res.end();
})
server.listen(8080);