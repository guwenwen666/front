# Class 与 Style 绑定
操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

## 绑定class
* 对象语法
  * v-bind:class="{ active: isActive }"
  * :class="{ active: isActive, 'text-danger': hasError }"
  * 计算属性v-bind:class="classObject"
```
  computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```
* 数组语法
   *  v-bind:class="[activeClass, errorClass]"  
    data: {  
     activeClass: 'active',  
     errorClass: 'text-danger'  
    }

   * 三元表达式:v-bind:class="[isActive ? activeClass : '', errorClass]"
   * 在数组语法中也可以使用对象语法:v-bind:class="[{ active: isActive }, errorClass]"
* 用在组件上
当在一个自定义组件上使用 class 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。

例如，如果你声明了这个组件：
```
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```
然后在使用它的时候添加一些 class：
```
<my-component class="baz boo"></my-component>
```
HTML 将被渲染为:

```
<p class="foo bar baz boo">Hi</p>
```
对于带数据绑定 class 也同样适用：
```
<my-component v-bind:class="{ active: isActive }"></my-component>
当 isActive 为 truthy[1] 时，HTML 将被渲染成为：

<p class="foo bar active">Hi</p>
```
## 绑定内联样式
* 对象语法
　　* v-bind:style="styleObject"
```
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```
* 数组语法：v-bind:style 的数组语法可以将多个样式对象应用到同一个元素上：
   *  v-bind:style="[baseStyles, overridingStyles]"

## 自动添加前缀
当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

## 多重值
从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
```
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```
这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。