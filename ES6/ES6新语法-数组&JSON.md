## 数组/JSON
### 数组

* map --映射，一一对应  
```
let arr = [1,2,3,4,5,6];
let arr_new = arr.map(function(item){
    return item>=2
});
console.log('arr_new',arr_new);// [false, true, true, true, true, true]
```

---
* filter --过滤
```
let arr = [1,2,3,4,5];
let arr2 = arr.filter(function(item){
    return item%2 !=0
});
console.log(arr2)//[1,3,5]
```

---

* forEach --遍历 `没有返回值`
```
let arr =[1,2,4,5];
let arr2 = arr.forEach(item=>{
    console.log(item);
})
```
---
* reduce --归一
```
let arr = [1,4,5,543,23];
let arr1 = arr.reduce((tmp,item,index)=>{
    console.log(tmp,item,index);//tmp原始值，item数组值
    //1 4 1
    //5 5 2
    //10 543 3
    //553 23 4
    return tmp+item;//arr1 576
})
```
---
* Array.from --把类数组转化成数组  
`将一个类数组对象转换为一个真正的数组，必须具备以下条件：`  
1、该类数组对象必须具有length属性，用于指定数组的长度。如果没有length属性，那么转换后的数组是一个空数组。  
2、该类数组对象的属性名必须为数值型或字符串型的数字  
ps: 该类数组对象的属性名可以加引号，也可以不加引号  

---
## JSON
1、名字和值一样，可以省略
```
let b=2;
let a ={
    b
}//{b:2}
```
2、function可以省略
```
    let show = {
        b,
        show(){
            alert(this.b);
        }
    }
```

