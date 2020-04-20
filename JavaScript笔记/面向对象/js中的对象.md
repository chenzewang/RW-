<!--
 * @Author: your name
 * @Date: 2020-03-04 08:38:41
 * @LastEditTime: 2020-03-05 13:41:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\面向对象\js中的对象.md
 -->

个人做笔记用,整文逻辑性不强

> 面向对象（Object-Oriented，OO）的语言有一个标志，那就是它们都有类的概念，而通过类可以创建任意多个具有相同属性和方法的对象。js 中没有实际上的类的概念，因此它的对象也与基于类的语言中的对象有所不同。ECMA-262 把对象定义为：**无序属性的集合，其属性可以包含基本值、对象或者函数**。严格来讲，这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字都映射到一个值。正因为这样（以及其他将要讨论的原因），我们可以把 js 的对象想象成散列表：无非就是一组名值对，其中值可以是数据或函数。

<!-- TOC -->

- [1. 属性的特性](#1-属性的特性)
  - [1.1. 数据属性](#11-数据属性)
    - [1.1.1. 访问器属性](#111-访问器属性)
- [2. 创建对象的几个模式](#2-创建对象的几个模式)
  - [2.1. 工厂模式](#21-工厂模式)
  - [2.2. 构造函数模式](#22-构造函数模式)
  - [2.3. 原型模式](#23-原型模式)
    - [2.3.1. 原型对象](#231-原型对象)
    - [2.3.2. Object.prototype.hasOwnProperty()](#232-objectprototypehasownproperty)
    - [2.3.3. in 操作符](#233-in-操作符)
    - [2.3.4. 同时使用 hasOwnProperty()方法和 in 操作符](#234-同时使用-hasownproperty方法和-in-操作符)
    - [2.3.5. 更简单的原型语法](#235-更简单的原型语法)
    - [2.3.6. 原型模式的缺点](#236-原型模式的缺点)
  - [2.4. 组合使用构造函数模式和原型模式](#24-组合使用构造函数模式和原型模式)
  - [2.5. 动态原型模式](#25-动态原型模式)
  - [2.6. 寄生构造函数模式](#26-寄生构造函数模式)
  - [2.7. 稳妥构造函数模式](#27-稳妥构造函数模式)

<!-- /TOC -->

# 1. 属性的特性

对象的属性在创建时都带有一些特征值（characteristic）JavaScript 通过这些特征值来定义它们的行为。

> ECMA-262 第 5 版在定义只有内部才用的特性（attribute）时，描述了属性（property）的各种特征。ECMA-262 定义这些特性是为了实现 JavaScript 引擎用的，因此在 JavaScript 中不能直接访问它们。为了表示特性是内部值，该规范把它们放在了两对儿方括号中，例如`[[Enumerable]]`。

ECMAScript 中有两种属性：数据属性和访问器属性。

## 1.1. 数据属性

数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有 4 个描述其行为的特性。

- `[[Configurable]]`：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。直接在对象上定义的属性，它们的这个特性默认值为 true。
- `[[Enumerable]]`：表示能否通过 for-in 循环返回属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。
- `[[Writable]]`：表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。
- `[[Value]]`：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为 undefined。

例子:

```js
var person = {
  name: "Nicholas"
};

//person.name:

//[[Configurable]]： true。
//[[Enumerable]]：true。
//[[Writable]]： true。
//[[Value]]：Nicholas
```

要修改属性默认的特性，必须使用 `Object.defineProperty()`方法。这个方法接收三个参数：**属性所在的对象**、**属性的名字**和**一个描述符对象**。其中，描述符（descriptor）对象的属性必须是：configurable、enumerable、writable 和 value。设置其中的一或多个值，可以修改对应的特性值,比如:

```js
var person = {};
Object.defineProperty(person, "name", {
  writable: false,
  value: "Nicholas"
});
```

### 1.1.1. 访问器属性

访问器属性不包含数据值；它们包含一对儿 getter 和 setter 函数（不过，这两个函数都不是必需的）。在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用 setter 函数并传入新值，这个函数负责决定如何处理数据。访问器属性有如下 4 个特性。

- `[[Configurable]]`：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为 true。
- `[[Enumerable]]`：表示能否通过 for-in 循环返回属性。对于直接在对象上定义的属性，这个特性的默认值为 true。
- `[[Get]]`：在读取属性时调用的函数。默认值为 undefined。
- `[[Set]]`：在写入属性时调用的函数。默认值为 undefined。

与数据属性一样,必须使用 Object.defineProperty()来定义
例子:

```js
var book = {
  _year: 2004,
  edition: 1
};
Object.defineProperty(book, "year", {
  get: function() {
    return this._year;
  },
  set: function(newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  }
});
book.year = 2005;
alert(book.edition); //2
```

setter 函数通过计算来确定正确的版本。因此，把 year 属性修改为 2005 会导致\_year 变成 2005，而 edition 变为 2。这是使用访问器属性的常见方式，即设置一个属性的值会导致其他属性发生变化。

> 由于为对象定义多个属性的可能性很大，ECMAScript 5 又定义了一个 `Object.defineProperties()`方法。利用这个方法可以通过描述符一次定义多个属性。这个方法接收两个对象参数：第一个对象是要添加和修改其属性的对象，第二个对象的属性与第一个对象中要添加或修改的属性一一对应。

# 2. 创建对象的几个模式

虽然 Object 构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。为解决这个问题，人们开始使用工厂模式的一种变体。

## 2.1. 工厂模式

用函数来封装以特定接口创建对象的细节

```js
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    alert(this.name);
  };
  return o;
}
var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");
```

工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。随着 JavaScript 的发展，又一个新模式出现了。

## 2.2. 构造函数模式

ECMAScript 中的构造函数可用来创建特定类型的对象。像 Object 和 Array 这样的原生构造函数，在运行时会自动出现在执行环境中。此外，也可以创建**自定义的构造函数**，从而定义自定义对象类型的属性和方法。例如，可以使用构造函数模式将前面的例子重写如下

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    alert(this.name);
  };
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```

> 这里推荐大家了解一下关于 new 操作符 [JS 的 new 到底是干什么的？](https://zhuanlan.zhihu.com/p/23987456?refer=study-fe)

在这个例子中，Person()函数取代了 createPerson()函数。我们注意到，Person()中的代码除了与 createPerson()中相同的部分外，还存在以下不同之处：

- 没有显式地创建对象；
- 直接将属性和方法赋给了 this 对象；
- 没有 return 语句。

person1 和 person2 分别保存着 Person 的一个不同的实例。这两个对象都有一个 constructor（构造函数）属性，该属性指向 Person，如下所示。

```js
alert(person1.constructor == Person); //true
alert(person2.constructor == Person); //true
```

对象的 constructor 属性最初是用来标识对象类型的。但是，提到检测对象类型，还是 instanceof 操作符要更可靠一些。我们在这个例子中创建的所有对象既是 Object 的实例，同时也是 Person 的实例，这一点通过 instanceof 操作符可以得到验证。

```js
alert(person1 instanceof Object); //true
alert(person1 instanceof Person); //true
alert(person2 instanceof Object); //true
alert(person2 instanceof Person); //true
```

创建自定义的构造函数意味着将来**可以将它的实例标识为一种特定的类型**；而这正是构造函数模式胜过工厂模式的地方。在这个例子中，person1 和 person2 之所以同时是 Object 的实例，是因为所有对象均继承自 Object

关于构造函数:

- 将构造函数当作函数

  > 构造函数与其他函数的唯一区别，就在于调用它们的方式不同。不过，构造函数毕竟也是函数，不存在定义构造函数的特殊语法。**任何函数，只要通过 new 操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过 new 操作符来调用，那它跟普通函数也不会有什么两样**。例如，前面例子中定义的 Person()函数可以通过下列任何一种方式来调用

  ```js
  var person = new Person("Nicholas", 29, "Software Engineer");
  person.sayName(); //"Nicholas"
  // 作为普通函数调用
  Person("Greg", 27, "Doctor"); // 添加到 window
  window.sayName(); //"Greg"
  // 在另一个对象的作用域中调用
  var o = new Object();
  Person.call(o, "Kristen", 25, "Nurse");
  o.sayName(); //"Kristen"
  ```

- 构造函数的问题
  > 构造函数模式虽然好用，但也并非没有缺点。使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。在前面的例子中，person1 和 person2 都有一个名为 sayName()的方法，但那两个方法不是同一个 Function 的实例。不要忘了——ECMAScript 中的函数是对象，因此每定义一个函数，也就是实例化了一个对象。从逻辑角度讲，此时的构造函数也可以这样定义。
  ```js
  function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = new Function("alert(this.name)"); // 与声明函数在逻辑上是等价的
  }
  ```
  从这个角度上来看构造函数，更容易明白每个 Person 实例都包含一个不同的 Function 实例（以显示 name 属性）的本质。说明白些，以这种方式创建函数，会导致不同的作用域链和标识符解析，但创建 Function 新实例的机制仍然是相同的。因此，不同实例上的同名函数是不相等的，以下代码可以证明这一点。
  ```js
  alert(person1.sayName == person2.sayName); //false
  ```
  然而，创建两个完成同样任务的 Function 实例的确没有必要(占内存)；况且有 this 对象在，根本不用在执行代码前就把函数绑定到特定对象上面。因此，大可像下面这样，通过把函数定义转移到构造函数外部来解决这个问题。
  ```js
  function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
  }
  function sayName() {
    alert(this.name);
  }
  var person1 = new Person("Nicholas", 29, "Software Engineer");
  var person2 = new Person("Greg", 27, "Doctor");
  ```
  在这个例子中，我们把 sayName()函数的定义转移到了构造函数外部。而在构造函数内部，我们将 sayName 属性设置成等于全局的 sayName 函数。这样一来，由于 sayName 包含的是一个指向函数的指针，因此 person1 和 person2 对象就共享了在全局作用域中定义的同一个 sayName()函数。这样做确实解决了两个函数做同一件事的问题，可是新问题又来了：在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。而更让人无法接受的是：如果对象需要定义很多方法，那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。好在，这些问题可以通过使用**原型模式**来解决。

## 2.3. 原型模式

我们创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是**包含可以由特定类型的所有实例共享的属性和方法**。如果按照字面意思来理解，那么 prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中，如下面的例子所示

```js
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
  alert(this.name);
};
var person1 = new Person();
person1.sayName(); //"Nicholas"
var person2 = new Person();
person2.sayName(); //"Nicholas"
alert(person1.sayName == person2.sayName); //true
```

### 2.3.1. 原型对象

> 无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 prototype 属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 constructor（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针。就拿前面的例子来说，Person.prototype. constructor 指向 Person。而通过这个构造函数，我们还可继续为原型对象添加其他属性和方法。

关于原型对象 单独写了一篇:[js 中的原型对象/prototype](https://www.cnblogs.com/riwang/p/12409928.html)

### 2.3.2. Object.prototype.hasOwnProperty()

可以检测一个属性是存在于实例中，还是存在于原型中
例子:

```js
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
  alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
alert(person1.hasOwnProperty("name")); //false
person1.name = "Greg";
alert(person1.name); //"Greg"——来自实例
alert(person1.hasOwnProperty("name")); //true

alert(person2.name); //"Nicholas"——来自原型
alert(person2.hasOwnProperty("name")); //false

delete person1.name;
alert(person1.name); //"Nicholas"——来自原型
alert(person1.hasOwnProperty("name")); //false
```

### 2.3.3. in 操作符

in 操作符会在通过对象能够访问给定属性时返回 true，无论该属性存在于实例中还是原型中。

```js
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
  alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
alert(person1.hasOwnProperty("name")); //false
alert("name" in person1); //true
person1.name = "Greg";
alert(person1.name); //"Greg" ——来自实例
alert(person1.hasOwnProperty("name")); //true
alert("name" in person1); //true
alert(person2.name); //"Nicholas" ——来自原型
alert(person2.hasOwnProperty("name")); //false
alert("name" in person2); //true
delete person1.name;
alert(person1.name); //"Nicholas" ——来自原型
alert(person1.hasOwnProperty("name")); //false
alert("name" in person1); //true
```

### 2.3.4. 同时使用 hasOwnProperty()方法和 in 操作符

可以用来确定该属性到底是是否存在于原型中

```js
function hasPrototypeProperty(object, name) {
  return !object.hasOwnProperty(name) && name in object;
}
```

返回 true 是存在于原型
返回 false 是不存在或者在实例中

### 2.3.5. 更简单的原型语法

```js
function Person() {}
Person.prototype = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName: function() {
    alert(this.name);
  }
};
```

在上面的代码中，我们将 Person.prototype 设置为等于一个以对象字面量形式创建的新对象。最终结果相同，但有一个例外：constructor 属性不再指向 Person 了。前面曾经介绍过，每创建一个函数，就会同时创建它的 prototype 对象，这个对象也会自动获得 constructor 属性。而我们在这里使用的语法，本质上完全重写了默认的 prototype 对象，因此 constructor 属性也就**变成了新对象的 constructor 属性**（指向 Object 构造函数）

如果 constructor 很重要,可以将其设置回去,方法: 原书 P155,这里不做叙述
constructor 的作用:

> 通俗的讲，就是为了将实例的构造器的原型对象暴露出来, 比如你写了一个插件,别人得到的都是你实例化后的对象, 如果别人想扩展下对象,就可以用 instance.constructor.prototype 去修改或扩展原型对象。
> [JavaScript 函数 constructor 的作用，意义](https://www.cnblogs.com/cyclone77/p/5157875.html)

### 2.3.6. 原型模式的缺点

每个实例的引用类型的实例是共享的

```js
function Person() {}
Person.prototype = {
  constructor: Person,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  friends: ["Shelby", "Court"],
  sayName: function() {
    alert(this.name);
  }
};
var person1 = new Person();
var person2 = new Person();
person1.friends.push("Van");
alert(person1.friends); //"Shelby,Court,Van"
alert(person2.friends); //"Shelby,Court,Van"
alert(person1.friends === person2.friends); //true
```

假如我们的初衷就是像这样在所有实例中共享一个数组，那么对这个结果我没有话可说。可是，实例一般都是要有属于自己的全部属性的。而这个问题正是我们很少看到有人单独使用原型模式的原因所在。

## 2.4. 组合使用构造函数模式和原型模式

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["Shelby", "Court"];
}
Person.prototype = {
  constructor: Person,
  sayName: function() {
    alert(this.name);
  }
};
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
alert(person1.friends); //"Shelby,Count,Van"
alert(person2.friends); //"Shelby,Count"
alert(person1.friends === person2.friends); //false
alert(person1.sayName === person2.sayName); //true
```

## 2.5. 动态原型模式

它把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型（仅在必要的情况下），又保持了同时使用构造函数和原型的优点。

```js
function Person(name, age, job) {
  //属性
  this.name = name;
  this.age = age;
  this.job = job;
  //方法
  if (typeof this.sayName != "function") {
    Person.prototype.sayName = function() {
      alert(this.name);
    };
  }
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();
```

## 2.6. 寄生构造函数模式
基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象；但从表面上看，这个函数又很像是典型的构造函数。
```js
function Person(name, age, job){ 
 var o = new Object(); 
 o.name = name; 
 o.age = age; 
 o.job = job; 
 o.sayName = function(){ 
 alert(this.name); 
 }; 
 return o; 
} 
var friend = new Person("Nicholas", 29, "Software Engineer"); 
friend.sayName(); //"Nicholas"
```
这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的特殊
数组。由于不能直接修改 Array 构造函数，因此可以使用这个模式。
```js
function SpecialArray(){ 
 //创建数组
 var values = new Array(); 
 //添加值
 values.push.apply(values, arguments); 
 //添加方法
 values.toPipedString = function(){ 
 return this.join("|"); 
 }; 
 
 //返回数组
 return values; 
} 
var colors = new SpecialArray("red", "blue", "green"); 
alert(colors.toPipedString()); //"red|blue|green"
```
关于寄生构造函数模式，有一点需要说明：首先，返回的对象与构造函数或者与构造函数的原型属性之间没有关系(`实例.__proto__=Object.prototype`)；也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么不同。为此，不能依赖 instanceof 操作符来确定对象类型。由于存在上述问题，我们建议在可以使用其他模式的情况下，不要使用这种模式。

## 2.7. 稳妥构造函数模式
所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。稳妥对象最适合在一些安全的环境中（这些环境中会禁止使用this 和 new），或者在防止数据被其他应用程序（如 Mashup程序）改动时使用。稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：一是新创建对象的实例方法不引用 this；二是不使用 new 操作符调用构造函数。按照稳妥构造函数的要求，可以将前面的 Person 构造函数重写如下

```js
function Person(name, age, job){ 
 //创建要返回的对象
 var o = new Object();
 //可以在这里定义私有变量和函数
 //添加方法
 o.sayName = function(){ 
 alert(name); 
 }; 
 
 //返回对象
 return o; 
}
```
注意，在以这种模式创建的对象中，除了使用 sayName()方法之外，没有其他办法访问 name 的值。可以像下面使用稳妥的 Person 构造函数。
```js
var friend = Person("Nicholas", 29, "Software Engineer"); 
friend.sayName(); //"Nicholas"
```
这样，变量 friend 中保存的是一个稳妥对象，而除了调用 sayName()方法外，没有别的方式可以访问其数据成员。即使有其他代码会给这个对象添加方法或数据成员，但也不可能有别的办法访问传入到构造函数中的原始数据。稳妥构造函数模式提供的这种安全性，使得它非常适合在某些安全执行环境——例如，ADsafe（www.adsafe.org）和 Caja（http://code.google.com/p/google-caja/）提供的环境——
下使用。