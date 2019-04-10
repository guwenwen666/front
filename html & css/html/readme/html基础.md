## 网页（web）
* 组成:文字、图像、超链接、音频、视频、flash

## 浏览器
* 代码==》浏览器（中介、渲染）==》页面  
* 浏览器内核：渲染引擎和js引擎   
Trident（ie内核）  
Gecko（firefox内核）  
webkit（safari内核）
chromium/blink（chrome内核）    

* web标准  
结构标准：xml html  
样式标准：css  
行为标准：dom  js  

* html初识  

```
<html> //html标签：作用所有html标签的根节点
    <head>//用于存放 title meta base style script link
        <title></title>
    </head>
    <body>
    </body>
</html>
```
*  标签分类  
1.双标签  
2.单标签  ```<br />```  

### 排版标签
* head  \<h1>\</h1>-- \<h6>\</h6>
* 段落标签 \<p>\</p>  
* 水平标签 \<hr />  

### 换行标签
* \<br />

### div span标签  没有语义 用于布局  

### 文本格式化标签  
* b \<b>\</b>加粗
* `strong(推荐使用) 加粗`
* i 倾斜
* `em(推荐使用) 倾斜`
* s 删除线
* `del (推荐使用) 删除线`
* u 下划线
* `ins(推荐) 下划线`  
***

## 标签属性
\<hr  width = "500" color="pink"/>

***
### 图像标签
* \<img src=""/>   
src是必须属性  ：图像路径  
alt图片不能显示时的的替换文字  
title 鼠标放上去悬停时候显示的文字  
width height `一般情况下只需要更改高度或宽度 其余会等比缩放`  
border 边框  

### 链接标签
* \<a href="http://www.baidu.com">\</a>  
href跳转的路径  
链接地址必须以http://开头  

### 锚点定位
