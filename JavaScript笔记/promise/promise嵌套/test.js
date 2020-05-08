/*
 * @Author: your name
 * @Date: 2020-05-06 10:20:07
 * @LastEditTime: 2020-05-06 14:28:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\promise\promise嵌套\test.js
 */

function loadPresentDevices() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log(444);
      resolve("loadPresentDevices resolve")
    }, 200)
  })
}

function loadInitState() {
  return loadPresentDevices().then(function (devices) {
    console.log(devices);
    return new Promise((resolve) => {
      console.log(2222);
      resolve(2222)
    })
  })
}
loadInitState().then(() => {
  console.log(333);
})
// console.log(loadInitState());