<!--
 * @Author: your name
 * @Date: 2020-02-29 14:18:39
 * @LastEditTime: 2020-02-29 14:50:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\css\css函数\css中的函数.md
 -->
##前言:
如果你使用过 CSS 预处理器，比如 SASS，以下示例你或许碰到过
```sass
.foo {
    width: 100px + 50px;
}

// 或者 使用sass变量
$width-one: 100px;
$width-two: 50px;
.bar {
    width: $width-one + $width-two;
}
```

其实,css中也带有如上面这个代码一样的简单表达式运算
```css
// Value specified in CSS
.foo {
    width: calc(100% - 50px);
}

```

>并且,css的表达式和使用css预处理器的差别在于:**浏览器解析的 calc() 的值为真实的 calc() 表达式**,而预处理器则被编译为'固定值',如下:
```css
// Value specified in SCSS
.foo {
    width: 100px + 50px;
}

// Compiled CSS and computed value in browser
.foo {
    width: 150px;
}

```

```css
// Value specified in CSS
.foo {
    width: calc(100% - 50px);
}

// Computed value in browser
.foo {
    width: calc(100% - 50px);
}
```

>这意味着浏览器中的值可以更加灵活，能够响应视口(viewport)的改变。我们能够给元素设定一个高度为视口的高度减去一个绝对值，它将随视口的改变进行调节,调试更加方便

## 常用的css函数

### rgb() rgba() 红绿蓝颜色函数
最常用的两个肯定是**rgba()**和**rgb()**函数

>rgb()
  使用红(R)、绿(G)、蓝(B)三个颜色的叠加来生成各式各样的颜色。

>rgba()
	使用红(R)、绿(G)、蓝(B)、透明度(A)的叠加来生成各式各样的颜色。


```css
#p1 {background-color:rgb(255,0,0);} /* 红 */
#p2 {background-color:rgb(0,255,0);} /* 绿 */
#p3 {background-color:rgb(0,0,255);} /* 蓝 */

```


### var()  变量函数

var() 函数用于插入自定义的属性值，如果一个属性值在多处被使用，该方法就很有用。
```
var(custom-property-name, value)
```
|值|描述|
|-|-|
|custom-property-name	|必需。自定义属性的名称，必需以 -- 开头。|
|value	|可选。备用值，在属性不存在的时候使用。|


如下:
>定义一个名为 "--main-bg-color" 的属性，然后使用 var() 函数调用该属性：

```css
:root {
  --main-bg-color: coral;
}
 
#div1 {
  background-color: var(--main-bg-color);
}
 
#div2 {
  background-color: var(--main-bg-color);
}

```


### attr() 属性函数

attr() 函数返回选择元素的属性值。

```html
<a href="https://www.cnblogs.com/riwang/">帅气的日王</a>
<style>
a:after {content: " (" attr(href) ")";}
</style>
```

效果如下:
<a href="https://www.cnblogs.com/riwang/">帅气的日王</a>
<style>
a:after {content: " (" attr(href) ")";}
</style>


 
### calc() 计算函数
calc() 函数用于动态计算长度值。


>+ 需要注意的是，运算符前后都需要保留一个空格，例如{width: calc(100% - 10px);}
>+ 任何长度值都可以使用calc()函数进行计算；
>+ calc()函数支持 "+", "-", "*", "/" 运算；
>+ calc()函数使用标准的数学运算优先级规则；




如下例:
```html
<p>创建一个横跨屏幕的div，div 两边有 50px 的间隙：</p>
<div id="div1">一些文本</div>

<style>
#div1 {
    width: calc(100% - 100px);
    margin:0 auto;
    border: 1px solid black;
    background-color: yellow;
    padding: 5px;
    text-align: center;
}
</style>
```

<div id="div1">一些文本</div>

<style>
#div1 {
    width: calc(100% - 100px);
    margin:0 auto;
    border: 1px solid black;
    background-color: yellow;
    padding: 5px;
    text-align: center;
}
</style>


## 更多css函数:

[菜鸟教程](https://www.runoob.com/cssref/css-functions.html)