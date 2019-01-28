## 函数
### 箭头函数  
function(){函数体}=>()=>{函数体}  
1.有且只有一个参数，()可以省
2.如果函数体积只有一句话且是return，省去{}和return

`关于this`
* 普通函数：根据调用我的人
* 箭头函数：根据所在环境

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