/*
 * @Author: your name
 * @Date: 2020-05-18 21:17:27
 * @LastEditTime: 2020-05-18 21:20:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\回调函数\回调函数.js
 */




function defind(fn) {
  var options = {
    a: "a"
  }
  var sub = "sub"

  var channels = "channels"

  fn(options, sub, channels)
}


defind(function (options, sub, channels) { //这里options, sub, channels只是形参，具体是什么东西要看defind传的是什么
  console.log(options);
  console.log(sub);
  console.log(channels);
})