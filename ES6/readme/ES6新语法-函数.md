## 函数
### 箭头函数  
function(){函数体}=>()=>{函数体}  
1.有且只有一个参数，()可以省
2.如果函数体积只有一句话且是return，省去{}和return

`关于this`:this只有在函数被调用，或者通过构造函数new Object()的形式才会有this
* 普通函数：  

1. this总是代表它的直接调用者(js的this是执行上下文), 例如 obj.func ,那么func中的this就是obj

2. 在默认情况(非严格模式下,未使用 'use strict'),没找到直接调用者,则this指的是 window (约定俗成)

3. 在严格模式下,没有直接调用者的函数中的this是 undefined

4. 使用call,apply,bind绑定的,this指的是 绑定的对象

* 箭头函数：  
1. 箭头函数没有自己的this, 它的this是继承而来; `默认指向在定义它时所处的对象(宿主对象)`,而不是执行时的对象, 定义它的时候,可能环境是window; 箭头函数可以方便地让我们在 setTimeout ,setInterval中方便的使用this

2. 箭头函数中，this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。


---
### 默认参数
```
    function show(a=8,b=6){
        alert(a+b);
    }
```

### 剩余参数
* 接收剩余参数 `剩余参数必须在参数列表最后`
```
    function show(a,...args){
        console.log(a,...args);
    }
```
* 展开数组
```
let arr = [1,2,3]; 
console.log("展开的数组为",...arr);// 1 2 3
let arr2 = [2,34,...arr];
console.log("arr2",arr2)//2,34,1,2,3
```