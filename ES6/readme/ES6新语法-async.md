### async/await  
`async：定义函数`  
`await:等待一个异步函数（promise）执行完`
```
    async function show(){
        alert('aaa');
        await new Promise((resolve,reject)=>{
            setTimeout(function(){
                resolve();
            },2000);
        });
        alert('bbb');
    }
```
`异常捕获；try{}catch(e){}`