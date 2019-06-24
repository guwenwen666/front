//创建一个mvvm构造函数
function Mvvm(options = {}) {
    this.$options = options;
    let data = this._data = this.$options.data;
    //数据劫持
    // 为什么要做数据劫持？
    // 观察对象，给对象增加Object.defineProperty
    // vue特点是不能新增不存在的属性 不存在的属性没有get和set
    // 深度响应 因为每次赋予一个新对象时会给这个新对象增加defineProperty(数据劫持)
    observe(data);
    //数据代理
    //this代理this._data
    for (let key in data) {
        Object.defineProperty(this, key, {
            configurable: true,
            get() {
                return this._data[key]
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        })
    }
    Compile(options.el, this);
}
//创建一个Observe构造函数
//写数据劫持的主要逻辑
function Observe(data) {
    let dep = new Dep();
    //所谓数据劫持就是给数据增加get、set
    for (let key in data) {
        let val = data[key];
        observe(val);//递归继续向下找，实现深度数据劫持
        Object.defineProperty(data, key, {
            configurable: true,//可以删除属性，
            get() {
                Dep.target && dep.addSub(Dep.target); // 将watcher添加到订阅事件中 [watcher]
                return val;
            },
            set(newVal) {
                if (val === newVal) {//设置值跟之前一样就不管
                    return;
                }
                val = newVal;//如果以后再获取值（get）的时候，将刚才设置的值再返回去
                observe(newVal);//当设置为新值后，也需要把新值再去定义成属性
                dep.notify(); // 让所有watcher的update方法执行即可
            }
        })
    }
}
//不用每次调用都写new
//方便每次递归调用
function observe(data) {
    //如果不是对象就直接return
    //防止递归溢出
    if (!data || typeof data !== 'object') return;
    return new Observe(data);
}
//数据编译 把{{}}里面的内容解析出来
//创建Compile构造函数
function Compile(el, vm) {
    // 将el挂载到实例上方便调用
    vm.$el = document.querySelector(el);
    //在el范围内将内容都拿到，当然不能一个一个的拿
    //可以选择移到内存中然后放入文档碎片中，节省开销
    let fragment = document.createDocumentFragment();
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child); // 此时将el中的内容放入内存中
        /* appendChild 成功后，会把节点从原来的节点位置移除；
        当进入 while 循环的下次执行(child = node.firstChild) 时, 这里面运算的 firstChild 已经变成了原先移除的下一个节点;
        直到 node 中再也没有节点时，(child = node.firstChild) 的返回值会为「false」, 这时循环就结束了，appendChild 也完成了。 */
    }
    //对el里的内容进行替换
    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            let reg = /\{\{(.*?)\}\}/g; // 正则匹配{{}}
            if (node.nodeType === 3 && reg.test(txt)) { // 即是文本节点又有大括号的情况{{}}
                console.log(RegExp.$1); // 匹配到的第一个分组 如： a.b, c
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach(key => {
                    val = val[key]; // 如this.a.b
                });
                // 用trim方法去除一下首尾空格
                node.textContent = txt.replace(reg, val).trim();
                //订阅一个事件，当数据改变需要重新刷新视图
                //通过new Watcher把数据订阅一下，数据一变就执行改变内容操作
                //给Watcher再添加两个参数，用来取新的值给回调函数传参
                new Watcher(vm, RegExp.$1, newVal => {
                    node.textContent = txt.replace(reg, newVal).trim();
                })
            }
            // 如果还有子节点，继续递归replace
            if (node.childNodes && node.childNodes.length) {
                replace(node);
            }
        });
    }
    replace(fragment);//替换内容
    vm.$el.appendChild(fragment); // 再将文档碎片放入el中
}
//发布订阅
//发布订阅主要靠数组关系，订阅就是放入函数，发布就是让数组里的函数执行
function Dep() {
    //一个数组(存放函数的事件池)
    this.subs = [];
}
Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub);
    },
    notify() {
        //绑定的方法,都有一个update方法
        this.subs.forEach(sub => {
            sub.upDate();
        })
    }
}
//监听函数
//通过Watcher这个类创建的实例,都拥有update()方法
function Watcher(vm, exp, fn) {
    this.fn = fn//将fn绑到实例上
    this.vm = vm;
    this.exp = exp;
    //添加一个事件
    //我们这里先定义一个属性
    Dep.target = this;
    let arr = exp.split('.');
    let val = vm;
    arr.forEach(key => {
        val = val[key];//获取到this.a.b,默认就会调用get方法
    });
    Dep.target = null
}
Watcher.prototype.upDate = function () {
    // notify的时候值已经更改了
    // 再通过vm, exp来获取新的值
    let arr = this.exp.split('.');
    let val = this.vm;
    arr.forEach(key => {
        val = val[key]; // 通过get获取到新的值
    });
    this.fn(val); // 将每次拿到的新值去替换{{}}的内容即可
}