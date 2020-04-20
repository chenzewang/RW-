/*
 * @Author: your name
 * @Date: 2020-03-22 21:31:54
 * @LastEditTime: 2020-03-22 21:53:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\设计模式\发布订阅模式\发布订阅.js
 */

let pubSub = {
  list: {},
  subscrib: function (key, fn) { //订阅  key:要订阅的事件 fn:事件触发时要做的事情
    if (!this.list[key]) {
      this.list[key] = []
    }
    this.list[key].push(fn)
  },
  publish: function (key, ...arg) { //发布
    for (let fn of this.list[key]) {
      fn.call(this, ...arg)
    }
  },
  unSubscribe: function (key, fn) { //取消订阅
    let fnList = this.list[key];
    if (!fnList) return false;
    if (!fn) { //不传入指定取消的订阅方法，则清空所有key下的订阅
      fnList && (fnList.length == 0)
    } else {
      fnList.forEach((item, index) => {
        if (item === fn) {
          fnList.splice(index, 1)
        }
      })
    }

  }
}

pubSub.subscrib("onWork", time => {
  pubSub.publish("offWork", '123');
  console.log(`上班了：${time}`);
});
pubSub.subscrib("offWork", time => {
  console.log(`下班了：${time}`);
})
pubSub.subscrib("launch", time => {
  console.log(`吃饭了：${time}`);
})

pubSub.publish("offWork", "18:00:00");

pubSub.publish("onWork", "8:00:00");

pubSub.publish("launch", "12:00:00");

// 发布订阅模式中， 订阅者各自实现不同的逻辑， 且只接受自己对应的事件通知。