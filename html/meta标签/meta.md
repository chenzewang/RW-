<!--
 * @Author: your name
 * @Date: 2020-03-09 15:51:33
 * @LastEditTime: 2020-03-09 15:54:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\html\meta标签\meta.md
 -->
```html
  <meta name="参数" content="具体的描述">
```

meta常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务。

name属性:
常见的值
+ keywords
  用于告诉搜索引擎，你网页的关键字。举例：
  ```html
    <meta name="keywords" content="博客，前端">
  ```

+ description
  用于告诉搜索引擎，你网站的主要内容。举例：
  ```html
    <meta name="description" content="这是我的前端博客">
  ```

+ viewport 
  (移动端的窗口)
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  ```

 [具体](https://www.jianshu.com/p/306150ed746f)