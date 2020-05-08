/*
 * @Author: your name
 * @Date: 2020-03-30 21:00:20
 * @LastEditTime: 2020-04-27 16:07:28
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