## 面向对象
### 传统面向对象
1.创建对象  
```
    function Person(name,age){
        console.log(this);
        this.name = name;
        this.age = age;
    }
    //方法
    Person.prototype.showName = function(){
        console.log(this);
        console.log("我叫"+this.name);
    }
    let p = new Person('gww','18');
    p.showName();
```
2.继承
```
 //继承
    function wocker(name,age,job){
        Person.call(this,name,age);
        this.job = job
    }
    wocker.prototype = new Person();
    wocker.prototype.constructor = wocker;
    wocker.prototype.showJob = function(){
        alert(this.job);
    }
    let w = new wocker('gww',18,'富豪');
    w.showJob();
```

---
## ES6
```
    //创建对象
    class Person{
        //构造器
        constructor(name,age){
            console.log(this);
            this.name = name;
            this.age = age;
        }
        showName(){
            alert(this.name);
        }
    }
    let p = new Person('gww',18);
    p.showName();
```

```
    //继承
    class Wocker extends Person{
        constructor(name,age,job){
            super(name,age);
            this.job = job
        }
        showJob(){
            alert(this.job);
            // alert("--",this.name);
        }
    }
    let w = new Wocker('cwx','20',"程序猿");
    w.showJob();
    w.showName();
```