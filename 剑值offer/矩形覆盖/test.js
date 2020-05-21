/*
 * @Author: your name
 * @Date: 2020-05-21 19:55:08
 * @LastEditTime: 2020-05-21 20:20:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\剑值offer\矩形覆盖\test.js
 */
var map = {
  1: 1,
  2: 2,
  3: 3
}

function rectCover(number) {
  // write code here
  if (map[number]) {
    return map[number]
  } else {
    return rectCover(number - 1) + rectCover(number - 2)
  }
}
console.log(rectCover(4));