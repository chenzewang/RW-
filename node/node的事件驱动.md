> 照抄自[Understanding node.js](http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb)

> Node is basically very good when you need to do several things at the same time. Have you ever written a piece of code and said "I wish this would run in parallel"? Well, in node everything runs in parallel, except your code.

当你需要同时做几件事时，Node基本上非常好。你有没有写过一段代码并说“我希望这会并行运行”？ 在node中除了代码，所有的东西都是并行的。

>"Huh?"
That's right, everything runs in parallel, except your code. To understand that, imagine your code is the king, and node is his army of servants.

想象你的代码是大哥，node是他的马仔。

>The day starts by one servant waking up the king and asking him if he needs anything. The king gives the servant a list of tasks and goes back to sleep a little longer. The servant now distributes those tasks among his colleagues and they get to work.

这天马仔叫醒大哥并问他有什么需要做的。大哥给出一份任务清单然后继续睡觉去liao，马仔把任务分配给其他马仔一起去执行。

>Once a servant finishes a task, he lines up outside the kings quarter to report. The king lets one servant in at a time, and listens to things he reports. Sometimes the king will give the servant more tasks on the way out.
Life is good, for the king's servants carry out all of his tasks in parallel, but only report with one result at a time, so the king can focus. *

每当一个马仔收完保护费，他就会在大哥房外排队向大哥报告，每次大哥只听一个马仔汇报工作情况，有时候汇报完在马仔出门前还会给马仔在安排别的任务（即回调，给大嫂买包包之类的）


>"That's fantastic, but could you quit the silly metaphor and speak geek to me?"
Sure. A simple node program may look like this:

用下面这个代码段解释一下

```js
var fs = require('fs')
  , sys = require('sys');

fs.readFile('treasure-chamber-report.txt', function(report) {
  sys.puts("oh, look at all my money: "+report);
});

fs.writeFile('letter-to-princess.txt', '...', function() {
  sys.puts("can't wait to hear back from her!");
});

```

>Your code gives node the two tasks to read and write a file, and then goes to sleep. Once node has completed a task, the callback for it is fired. But there can only be one callback firing at the same time. Until that callback has finished executing, all other callbacks have to wait in line. In addition to that, there is no guarantee on the order in which the callbacks will fire.

这段代码让node去读和写两个任务，然后node就继续睡觉去了。直到有一个任务完成，触发了他的回调，但是**同时只能有一个回调函数执行（剩余的回调函数会排成一个队列，按顺序一个一个执行）**。因为任务是并行执行的，无法保证回调函数触发的顺序（这就是所谓回调地狱的原因）。

这就是JavaScripts单线程/事件循环设计的妙处~
