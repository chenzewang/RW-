/*
 * @Author: your name
 * @Date: 2020-03-09 14:41:32
 * @LastEditTime: 2020-04-16 15:10:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\promise\promise2.js
 */
function Promise(excutor) {
  var self = this
  self.onResolvedCallback = []

  function resolve(value) {
    setTimeout(() => {
      self.data = value
      self.onResolvedCallback.forEach(callback => callback(value))
    })
  }
  excutor(resolve.bind(self))
}
Promise.prototype.then = function (onResolved) {
  var self = this
  return new Promise(resolve => {
    self.onResolvedCallback.push(function () {
      var result = onResolved(self.data)
      if (result instanceof Promise) {
        result.then(resolve)
      } else {
        resolve(result)
      }
    })
  })
}

new Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 500)
  })
  .then(res => {
    console.log(res)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2)
      }, 500)
    })
  })
  .then(console.log)

function delay() {

}