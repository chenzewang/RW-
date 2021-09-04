/*
 * @Author: your name
 * @Date: 2020-03-09 12:28:19
 * @LastEditTime: 2020-07-06 12:03:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\promise\promise.js
 */
function Promise(executor) {

  var self = this; //resolve和reject中的this指向不是promise实例，需要用self缓存
  self.state = 'padding';
  self.value = ''; //缓存成功回调onfulfilled的参数
  self.reason = ''; //缓存失败回调onrejected的参数
  self.onResolved = []; // 专门存放成功的回调onfulfilled的集合
  self.onRejected = []; // 专门存放失败的回调onrejected的集合

  function resolve(value) {
    if (self.state === 'padding') {
      self.state === 'resolved';
      self.value = value;
      self.onResolved.forEach(fn => fn())
    }
  }

  function reject(value) {
    self.state = 'rejected';
    self.value = reason;
    self.onRejected.forEach(fn => fn())
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}


// then方法

//promise实例,每个实例都有一个then方法，这个方法传递两个参数，一个是成功回调onfulfilled,另一个是失败回调onrejected；

//promise实例调用then时， 如果状态resolved， 会让onfulfilled执行并且把成功的内容当作参数传递到函数中；

//promise中可以同一个实例then多次, 如果状态是pengding 需要将函数存放起来 等待状态确定后 在依次将对应的函数执行(发布订阅)

//为了链式调用,then需要返回promise: 因为promise状态确定后就是不能更改，所以每次promise执行then后都会返回一个新的promise而不是this，那么状态永远为resolve或jeject，将存在异步调用

//onfulfilled或onrejected是一个可选参数,需要做没有传递时的处理
Promise.prototype.then = function (onfulfilled, onrejected) {
  onfulfilled = typeof onfulfilled == 'function' ? onfulfilled : val => val; //onfulfilled缺省处理
  onrejected = typeof onrejected === 'function' ? onrejected : err => {
    throw err;
  }; //onrejected缺省处理
  var self = this
  var promise2 = new Promise(function (resolve, reject) { //返回一个promise
    if (this.state === 'resolved') {
      try {
        onfulfilled(self.value); //里面会执行resolve    
      } catch (e) {
        reject(e);
      }
    }
    if (this.state === 'rejected') {
      try {
        onrejected(self.value);
      } catch (e) {
        reject(e);
      }
    }
    if (this.state === 'padding') { //将执行过程缓存
      self.onResolved.push(function () {
        try {
          onfulfilled(self.value);
        } catch (e) {
          reject(e)
        }
      });
      self.onRejected.push(function () {
        try {
          onrejected(self.value);
        } catch (e) {
          reject(e)
        }
      })
    }
  })
  return promise2;
}


var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('start');
    resolve('this is res')
  }, 1000)
  resolve('this is res')

}).then((res) => {
  console.log(res);
  console.log('in then')
  return res
}).then(res => {
  console.log("then2");
})