/*
 * @Author: your name
 * @Date: 2020-03-30 21:00:20
 * @LastEditTime: 2020-04-29 11:04:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\test\test.js
 */

function func(params) {
  console.log(params);

}

function then(func) {
  //做一些操作

  //操作完了，执行回调函数
  var db = "xxxx"

  func(db)

}

then(func)


var a = async function (a, b) {
  if (typeof a == "string") {
    a = JSON.parse(a)
  }
  if (typeof b == "string") {
    b = JSON.parse(b)
  }

  return Object.assign(a, b)

}