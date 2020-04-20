/*
 * @Author: your name
 * @Date: 2020-03-23 08:33:32
 * @LastEditTime: 2020-03-23 08:49:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\vue\简单的mvvm\observe.js
 */

var data = {
  name: 'riWang'
}
observer(data)
data.name = "aaaaaa"


function observe(data) {
  if (!data || typeof data != 'object') {
    return
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]) //监听每个属性
  })
}

function defineReactive(data, key, val) {
  var dep = new Dep();
  observe(val); //监听子属性
  Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: false, // 不能再define
    get: function () {
      // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set: function (newVal) {
      // if (val === newVal) return;
      console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
      val = newVal;
      dep.notify(); // 通知所有订阅者
    }
  })
}


function Dep() {
  this.subs = []; //订阅者数组
}
Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};