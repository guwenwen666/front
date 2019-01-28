## Promise-异步操作同步化  
//`成功调用resolve,失败调用reject` 
```
let p = new Promise((resolve,reject)=>{  

});
p.then(json=>{

},err=>{

}) 
```
`Promise.all([p1,p2...pn]).then();所有都成功`  
`Promise.race([p1,p2...pn]).then();只要有一个完成`
