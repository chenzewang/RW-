<!--
 * @Author: your name
 * @Date: 2020-03-05 13:45:11
 * @LastEditTime: 2020-03-05 22:41:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\面向对象\js中的继承.md
 -->

# 原型链 
ECMAScript 中描述了原型链的概念，并将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

简单回顾一下构造函数、原型和实例的关系：
+ 每个构造函数都有一个原型对象
  > 构造函数的`prototype`指向它的原型对象;
+ 原型对象都包含一个指向构造函数的指针
  >即`构造函数.prototype.constructor`
+ 而实例都包含一个指向原型对象的内部指针。
  >`实例.constructor`指向原型对象

 那么，假如我们让原型对象等于另一个类型的实例，结果会怎么样呢？
 
 显然，此时的原型对象将包含一个指向另一个原型的指针，
 >`原型对象.__proto__`指向另一个原型的指针
 
 相应地，另一个原型中也包含着一个指向另一个构造函数的指针。
 
 假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓原型链的基本概念。

```js
function SuperType(){ 
 this.property = true; 
}
SuperType.prototype.getSuperValue = function(){ 
 return this.property; 
}; 

function SubType(){ 
 this.subproperty = false; 
} 
//继承了 SuperType 
var instance_SuperType=new SuperType(); 
SubType.prototype = instance_SuperType;
SubType.prototype.getSubValue = function (){ 
 return this.subproperty; 
}; 
var instance = new SubType(); 
alert(instance.getSuperValue()); //true
```

内存表示图:
![](https://ae01.alicdn.com/kf/U32ea55cb93c5497a94403991f616864aX.png
)

## 确定原型和实例的关系
### instanceof 操作符

# 借用构造函数

# 组合继承

# 原型式继承

# 寄生式继承

# 