<!--
 * @Author: your name
 * @Date: 2020-03-27 10:28:57
 * @LastEditTime: 2020-03-27 20:16:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\vue\v-dom\vdom.md
 -->

# 参考文章

- [React 是怎样炼成的](https://segmentfault.com/a/1190000013365426)

# 来源

想要这样一个效果：当发生前后状态变化时，React 会自动更新 UI

于是就有了
伪码：

局部刷新：

![](https://camo.githubusercontent.com/9f58665be66f3eb922f5ccae50c0e3d7301d4714/687474703a2f2f696d67732e74616f77656e672e736974652f323031392d31322d32322d3135353031322e706e67)

```js
// 下面是伪代码
var ul = find(ul); // 先找到 ul
ul.append(`<li>${message3}</li>`); //然后再将message3插到最后

// 想想如果是不插到最后一个，而是插到中间的第n个
var ul = find(ul); // 先找到 ul
var preli = find(li(n - 1)); // 再找到 n-1 的一个 li
preli.next(`<li>${message3}</li>`); // 再插入到 n-1 个的后面
```

整体刷新：

```js
UI = f(messages); // 整体刷新 3 条消息，只需要调用 f 函数

// 这个是在初始渲染的时候就定义好的，更新的时候不用去管
function f(messages) {
  return (
    <ul>
      {messages.map(message => (
        <li>{message}</li>
      ))}
    </ul>
  );
}
```

这种方式虽然简单粗暴，但是很明显的缺点，就是很慢。
另外还有一个问题就是这样无法包含节点的状态。比如它会失去当前聚焦的元素和光标，以及文本选择和页面滚动位置，这些都是页面的当前状态。

# 进行优化

为了解决上面说的问题，对于没有改变的 DOM 节点，让它保持原样不动，仅仅创建并替换变更过的 DOM 节点。这种方式实现了 **DOM 节点复用**（Reuse）。

至此，只要能够识别出哪些节点改变了，那么就可以实现对 DOM 的更新。于是问题就转化为如何比对两个 DOM 的差异。

说道对比差异，可能很容易想到版本控制(git)。

DOM 是树形结构，所以 diff 算法必须是针对树形结构的。目前已知的完整树形结构 diff 算法复杂度为 O(n^3) 。
[完整的 Tree diff 实现算法。](https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)

但是时间复杂度 O(n^3) 太高了，所以 Facebook 工程师考虑到组件的特殊情况，然后将复杂度降低到了 O(n)。

[附：详细的 diff 理解：不可思议的 react diff 。](https://zhuanlan.zhihu.com/p/20346379)

做过 JS 应用优化的人可能都知道，DOM 是复杂的，对它的操作（尤其是查询和创建）是非常慢非常耗费资源的。看下面的例子，仅创建一个空白的 div，其实例属性就达到 231 个。

```js
// Chrome v63
const div = document.createElement("div");
let m = 0;
for (let k in div) {
  m++;
}
console.log(m); // 231
```

对于 DOM 这么多属性，其实大部分属性对于做 Diff 是没有任何用处的，所以如果用更轻量级的 JS 对象来代替复杂的 DOM 节点，然后把对 DOM 的 diff 操作转移到 JS 对象，就可以避免大量对 DOM 的查询操作。这个更轻量级的 JS 对象就称为 **Virtual DOM **。

那么现在的过程就是这样：

- 维护一个使用 JS 对象表示的 Virtual DOM，与真实 DOM 一一对应
- 对前后两个 Virtual DOM 做 diff ，生成变更（Mutation）
- 把变更应用于真实 DOM，生成最新的真实 DOM

可以看出，因为要把变更应用到真实 DOM 上，所以还是避免不了要直接操作 DOM ，但是 React 的 diff 算法会把 DOM 改动次数降到最低。

传统前端的编程方式是命令式的，直接操纵 DOM，告诉浏览器该怎么干。这样的问题就是，大量的代码被用于操作 DOM 元素，且代码可读性差，可维护性低。

React 的出现，将命令式变成了声明式，摒弃了直接操作 DOM 的细节，只关注数据的变动，DOM 操作由框架来完成，从而大幅度提升了代码的可读性和可维护性。

在初期我们可以看到，数据的变动导致整个页面的刷新，这种效率很低，因为可能是局部的数据变化，但是要刷新整个页面，造成了不必要的开销。

所以就有了 Diff 过程，将数据变动前后的 DOM 结构先进行比较，找出两者的不同处，然后再对不同之处进行更新渲染。

但是由于整个 DOM 结构又太大，所以采用了更轻量级的对 DOM 的描述—虚拟 DOM。

不过需要注意的是，虚拟 DOM 和 Diff 算法的出现是为了解决**由命令式编程转变为声明式编程、数据驱动后所带来的性能问题的**。_换句话说，直接操作 DOM 的性能并不会低于虚拟 DOM 和 Diff 算法，甚至还会优于。_
