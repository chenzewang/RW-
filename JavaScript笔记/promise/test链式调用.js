/*
 * @Author: your name
 * @Date: 2020-07-06 10:57:02
 * @LastEditTime: 2020-07-06 10:59:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\promise\test链式调用.js
 */


var ppp = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(111);
    resolve("re")
  }, 1100)
})

ppp.then(res => {
  setTimeout(() => {
    console.log(222);
    throw new Error("!11")
    return res
  }, 1000)
}).catch(err => {
  console.log("Eeeeerrrror");

})