<!--
 * @Author: your name
 * @Date: 2020-03-04 11:09:13
 * @LastEditTime: 2020-03-04 19:41:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\面向对象\js原型对象.md
 -->

前置任务

在说原型对象是什么之前,我们先讨论一下**对象**是什么东西
在说对象是什么之前,我们又得讨论一下**引用类型**

## 引用类型
![](https://ae01.alicdn.com/kf/U20e2ca4531c84551907708a77bde0a37O.jpg)
![](https://ae01.alicdn.com/kf/U511530ba0ea143d69c43f6a3ac1feba0a.jpg
)


首先,js 中变量的值分两种类型
+ **引用类型**
+ **值类型**
  
关于这两种类型,我们需要从内存的角度来看
```js
var num = 9527            //值类型
var str = "一段字符串"     // 值类型
var obj = {               // 引用类型
  attr_1:"qwer",
  attr_2:"df"
  }
```
上面这些数据,在内存中可能是这样的
![](https://ae01.alicdn.com/kf/U3542e69f0409488dad318b0a4e2cac45X.png
)
可以看到
+ 值类型的```num```和```str```两个变量,变量名直接对应具体值
+ 引用类型的```obj```这个变量对应的是一段地址,而这个地址的位置存的才是真正的obj的具体值(对象)
  
>至于为什么要这么存,这跟内存的管理有关就不展开说,简单的
  ![](https://ae01.alicdn.com/kf/Ua705ee20113a46d1b42e36fe758cc161l.png)
  你妈妈给你生了五个可爱的妹妹

  ```js
    for(var i=0;i<5;i++){
      var 妹妹i号=new 妹妹()
    }
  ```
> 每个妹妹都是new出来的一个对象,她们都有一些属性,比如
  ```js
  妹妹1号:{
    age:3
    name:妹妹1号,
    parent:{
      妈妈:你的妈妈,
      爸爸:你的爸爸
    }
  }
  ```
> 每个妹妹的```age```和```name```属性都是不同的,而```parent```属性都是相同的,这时候如果每个妹妹都存一份```parent```就太浪费内存了,所以我们可以存个地址.内存中这个地址的位置存真正的```parent```信息,这样就可以很好的利用起宝贵的内存空间啦
> ![](https://ae01.alicdn.com/kf/Uf5f678b8f2e34df1a364996fbbe4f3d9a.png
)
> ps: 我们建立一个概念,一个对象是一个独立的'块',而不是```妹妹i号.parent```这样一条属性,```妹妹i号.parent```这条属性指向一个对象,也不用纠结,先往下看


## 对象

前面我们说了,对象是独立的块内存,要想访问或者操作对象,就得通过该对象的的地址,而变量存储的就是这个地址

然后我们来看
```js
var obj = {
  attr_1: "qwer",
  attr_2: "df"
};
var obj_2=obj

obj_2.attr_1="qwqaqaaaaaawer"

console.log(obj.attr_1) //qwqaqaaaaaawer
```
这样,为什么改的是```obj_2.attr_1```而打印```obj.attr_1```的时候是```qwqaqaaaaaawer```应该就很清楚了



## 原型对象

无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 prototype 属性，这个属性指向函数的**原型对象**。
>注意两点
>  + 函数的```prototype```属性指向函数的**原型对象**,而不是说```prototype```就是**原型对象**,prototype是地址,内存中这个地址的位置上的东西才是**原型对象**
> + 函数也是对象,所以函数也可以有属性

![](https://ae01.alicdn.com/kf/U46d8e0cda836428591167588dad26c42I.png)
>拓展阅读: [为什么要创建原型对象](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)



在默认情况下，所有**原型对象**都会自动获得一个 constructor（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数(下图这个例子中的a)的地址。看图理解:

![](https://ae01.alicdn.com/kf/U510573949e094a1b8264fb00301d6b09d.png)
> 到目前为止,内存中是这样的
  ![](https://ae01.alicdn.com/kf/U9305c887af05488c8694e600a4765b6bq.png
)
> 思考题:为什么```a.prototype.constructor==a```
> 答案:```a.prototype.constructor```和```a```指向同一块内存



上面说,创建了自定义的构造函数之后，其原型对象**默认会取得 constructor 属性**
![](https://ae01.alicdn.com/kf/U094ee233e5f34660973c4e64fc48f883w.png
)
然鹅:
![](https://ae01.alicdn.com/kf/Ub44ac73a2d3d4871930f8c9ab912a279r.png
)
![](https://ae01.alicdn.com/kf/Ucce679c060be40e18de30b0e62ce0e82K.jpg
)
这个```a.prototype.toString```函数根本没有定义,上面的内存图中也看不到它,那它是从哪哪冒出来的???

至于其原型对象的其他方法，则都是从 Object 继承而来的。
![](https://ae01.alicdn.com/kf/U14a19c462e7843e5a7b67facf86b66c0X.png)
(这个`__proto__`是什么,看下面的详细讲解)

当调用构造函数创建一个新实例后(是一个对象)，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象。

es5 中管这个指针叫`[[Prototype]]`。虽然在 js 中没有标准的方式访问`[[Prototype]]`，

但 Firefox、Safari 和 Chrome 在**每个对象**(函数的原型对象也是对象,所以也有`__proto__`属性)上都支持一个属性`__proto__`；

> 再来看一遍这段代码:
> ![](https://ae01.alicdn.com/kf/U14a19c462e7843e5a7b67facf86b66c0X.png)
> - `a.prototype`指向原型对象,原型对象是由构造函数`Ojbect`生成的
> - `Object`也是一个函数,是`Object.prototype`指向**Object的原型对象**
> - 思考题: `a.prototype.__proto__`是函数`a`的原型对象的一条属性,这个属性的属性值是**一个地址**,那么内存中这个地址存的是什么?
> 答案: 存的是`Object`的原型对象
>附内存图一张,方便理解:
>![](https://ae01.alicdn.com/kf/Ubb163101fe9d44babe745f9b2620eb322.png
)


**这个连接存在于实例的原型对象与构造函数的原型对象之间，而不是存在于实例与构造函数之间**。
> `a`的原型对象是由构造函数`Object`生成的,他们两个之间存在链接(通过```__proto__```)

接着说,js中,有这样一条规则:访问一条属性(假设是属性attr)时,在当前对象(假设是obj)中找不到的,就往`obj.__proto__`找,即`obj.__proto__.attr`,再找不到,就往`obj.__proto__.__proto__`找,直到找到或者`obj.__proto__.......`为`null`才停止

所以 前面的`a.prototype.toString`实际上是`a.prototype.__proto__.toString`也就是`Object.tostring`