<!--
 * @Author: your name
 * @Date: 2020-02-24 14:34:20
 * @LastEditTime: 2020-02-24 14:41:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\css\inline-block的间距问题\inline-block的间距问题.md
 -->

```html

<div class="my-test">
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</div>
<Style>
.my-test { width: 100%; height: 50px;}
.my-test ul li { 
  list-style: none; 
  display: inline-block; 
  vertical-align: middle; 
  font-size: 12px; 
  text-align: center; 
  width: 20%;
  height: 100%; 
  line-height: 50px; 
  background: rgba(0,0,0,.4)}
</style>

```
效果如下:
![inline-block](https://img2018.cnblogs.com/blog/1020587/201902/1020587-20190214145655427-880392580.png)

为什么会出现间距呢?
把html换成如下:
```html
<div class="my-test">
  <ul id="ulid">
    <li>1</li>
    <li>2</li><li>3</li>
  </ul>
</div>
```
效果如图:
![](https://img2018.cnblogs.com/blog/1020587/201902/1020587-20190214150201126-376021626.png)

获取UL的子节点:
![](https://img2018.cnblogs.com/blog/1020587/201902/1020587-20190214150833064-839819455.png)

可以看到，第一个li和第二个li之间有一个text的节点，而第二个li和第三个li之间并没有节点。

这是因为 **换行符被浏览器解析为text节点**

#解决方法:
+ li标签不换行
+ font-size:0px