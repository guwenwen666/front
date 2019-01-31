### setTimeout()
setTimeout()方法用来指定某个函数或字符串在指定的毫秒数之后执行。它返回一个整数，表示定时器的编号，这个值可以传递给`clearTimeout()`用于取消这个函数的执行  
* 语法：setTimeout(函数表达式，毫秒数)；  
* setTimeout()只执行函数一次，如果需要多次调用可以使用setInterval(),或者在函数体内再次调用setTimeout()

### setInterval
setInterval()方法可按照指定的周期来调用函数或者计算表达式（以毫秒为单位）  
* 语法：setInterval(函数表达式，毫秒数)；  
* setInterval()会不停的调用函数，直到clearInterval()被调用或者窗口被关闭，由 setInterval()返回的ID值可用作clearInterval()方法的参数。


### 迭代setTimeout

* 为了避免setInterval()定时器的问题，可以使用链式setTimeout()调用
```
setTimeout(function fn(){
    setTimeout(fn,interval);
},interval);
```
这个模式链式调用了setTimeout()，每次函数执行的时候都会创建一个新的定时器。第二个setTimeout()调用当前执行的函数，并为其设置另外一个定时器。这样做的好处是，在前一个定时器代码执行完之前，不会向队列插入新的定时器代码，确保不会有任何缺失的间隔。而且，它可以保证在下一次定时器代码执行之前，至少要等待指定的间隔，避免了连续的运行