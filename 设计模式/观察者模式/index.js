/*
 * @Author: your name
 * @Date: 2020-03-22 21:10:47
 * @LastEditTime: 2020-03-22 21:20:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\设计模式\观察者模式\index.js
 */

class Subject {
  constructor() {
    this.observers = [] //观察者列表
  }
  add(observer) {
    this.observers.push(observer)
  }
  remove(observer) {
    let idx = this.observers.findIndex(item => item === observer)
    idx > -1 && this.observers.splice(idx, 1) //从观察者列表中删除
  }
  notify() {
    for (let observer of this.observers) {
      observer.update()
    }
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }

  update() {
    console.log(`我订阅的人通知我他更新了，我是${this.name}`);
  }
}

let subject = new Subject();

let obj1 = new Observer('obj11111')
let obj2 = new Observer('obj22222')
subject.add(obj1)
subject.add(obj2)

subject.notify()