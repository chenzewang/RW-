/*
 * @Author: your name
 * @Date: 2020-03-18 12:12:30
 * @LastEditTime: 2020-03-18 13:12:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\promise\手写primise.js
 */

function MyPromise(executor) {
  var _this = this
  this.status = 'pending' //success rejected pending
  this.data = undefined
  this.taskQueue = []
  this.catchCallback
  var resolve = function (data) {
    if (_this.status === 'pending') {
      _this.status = 'success'
      for (var i = 0; i < _this.taskQueue.length; i++) {
        _this.taskQueue[i](data)
      }
    }
  }
  var reject = function (data) {
    if (_this.status === 'pending') {
      _this.status = 'rejected'
      this.catchCallback(data)
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
MyPromise.prototype.then = function (callback) {
  var _this = this
  return new MyPromise((resolve, reject) => {
    try {
      callback()
    } catch (error) {
      reject(error)
    }
  })
}
MyPromise.prototype.catch = function (callback) {
  var _this = this
  return new MyPromise((resolve, reject) => {
    _this.callback = callback
    // _this.data
    reject(error)
  })
}


new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('aaa');
    throw new Error('test error')
    resolve()
  }, 3000)
}).then(res => {
  console.log('then here');
}).catch(res => {
  console.log(res);
})