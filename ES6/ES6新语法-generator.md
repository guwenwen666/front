## generator生成器  
```
//定义
function *show(){
    xxx;
    yield;
    xxx;
}
let gen = show();
gen.next();
gen.next();
```
`yield`  
1.暂停标志
2.传参
```
function *show2(){
    alert('aaa');
    let a =  yield;
    alert('bbb'+a);
}
let gen = show2();
gen.next();
gen.next(1);
```
3.返回值
```
function *show3(){
    alert('aaa');
    yield 1;
    alert('bbb');
}
let gen = show3();
let res1 = gen.next();
let res2 = gen.next();
console.log('res1',res1);//{value: 1, done: false}
console.log('res2',res2);//{value: undefined, done: true} 使用return返回值
```
