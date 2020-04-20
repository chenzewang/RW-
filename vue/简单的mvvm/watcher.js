/*
 * @Author: your name
 * @Date: 2020-03-23 08:41:54
 * @LastEditTime: 2020-03-23 08:42:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\vue\简单的mvvm\watcher.js
 */


// Watcher.js
Watcher.prototype = {
  get: function (key) {
    Dep.target = this;
    this.value = data[key]; // 这里会触发属性的getter，从而添加订阅者
    Dep.target = null;
  }
}