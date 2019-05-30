## 结构性元素
* article 文章块：表示文章，用来标识页面中一块完整的、独立的、可以被转发的内容。--报纸文章、论坛帖子、用户评论、博客条目
* section 区块：用于标识文档中的节，在页面上对多对内容进行分区，例如，章节、页眉、页脚或文档中的其他部分。通常由标题和内容组成。
    * section元素包含cite属性，用于定义section的URL，如果section摘自Web，则可设置该属性
    * 与div区别：div元素也可以用来进行分区，当一个容器需要被直接定义样式或通过脚本定义行为时，推荐使用div。
    * 与article区别：article是一段独立的内容，通常包含header和footer。section用于对网站或应用程序中页面的内容进行分块。article强调独立性，setion强调内容相关性
    * `[注意]：不要将section元素当作设置样式的结构容器，对于此类操作应该使用div实现，如果使用article、aside或nav更符合语义使用条件，不要首选section元素。不要为没有标题的内容区块使用section。`
* nav 导航条：用来标识页面导航的链接组。一个页面可以拥有多个nav，作为页面整体或不同部分的导航。
* aside 辅助栏
   * 作为主题内容的附属信息部分，包含在article中，aside内容可以是与当前内容有关的参考资料、名词解释等
   * 侧边栏，友情链接、最新文章列表、最新评论列表、历史存档、日历等
* main  主要区域。在一个页面中不能出现一个以上main元素，main元素不能被包含在article、aside、footer、header或nav中
* header 标题栏
* hgroup 标题组--用来为标题或子标题进行分组。通常hgroup与h1~h6元素组合使用，一个内容块中的标题及其子标题可以使用hgroup
* footer 用来表示文档或节的页脚。

## 语义元素
* address 联系信息，包括文档作者或文档编辑者名称、电子邮箱、真实地址、电话号码等
* time 显示时间
   * datetime:规定日期和时间的格式，否则由元素的内容给定日期和时间
   * pubdate:定义time元素中的日期和时间是文档或article内容的发布日期
* figure和figcaption 流媒体。
  * figure元素可以定义独立的流内容，如图像、图表、照片等。figcaption表示figure元素的标题，必须写在figure内部。
  ```
        <figure>
            <img src="img/1.jpg" width="400">
            <img src="img/2.jpg" width="400">
            <figcaption>动物</figcaption>//只能出现一次
        </figure>
     ```
* details和summary 详细内容,当detail元素展开或收缩，均触发toggle事件
```
        <details>
            <summary>动物</summary>//不写展示为详情信息
            <figure>
                <img src="img/1.jpg" width="400">
            </figure>
        </details>
```
* mark带有记号的文本，高亮显示，mark元素的标记目的与原文作者无关，而是被引用时添加上去的
```
    <article>
        <h1>静夜思</h1>
        <p>床前明月<mark>光</mark></p>
    </article>
```
* progress进度条，有两个属性
   * max 规定任务一共多少工作
   * value 规定已经完成多少任务
   ```
       <progress max="100" value="20"></progress>
    ```
* meter 度量，已知范围或分数内的标量测量。例如，磁盘用量，查询结果的相关性，有七个属性：
   * form:规定\<meter>所属的一个或多个表单
   * high:规定被视作高的值的范围
   * low：规定被视作低的值的范围
   * max：规定范围内最大值，默认为1
   * min：规定范围内的最小值
   * optimum：规定度量的优化值，必须在min和max之间
   * value:必须，规定度量的当前值
   ```
    <meter value="3" min='0' max="10" high="2" optimum="8"></meter>
    <meter value="0.6"></meter>
    ```
* dialog 模态对话框
```
    <dialog id="dialog">
        <h2>用户登录</h2>
        <main>
            <form>
                <label for="name" value= '用户名'>
                    <input id="name">
                </label>
                <label for="pwd" value="密码">
                    <input id="pwd">
                </label>
            </form>
            <button type="submit">登录</button>
            <button id="cls">关闭</button>
        </main>
    </dialog>
    // console.log("dialog",dialog.__proto__)//打印dialog方法
```
     