/*
 * @Author: your name
 * @Date: 2020-07-06 16:36:09
 * @LastEditTime: 2020-07-06 16:36:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\evenLoop\test.js
 */

async function f1() {
  console.log(2)
  await console.log(3);
  await console.log(3.5);
  console.log(4)
}
new Promise((res, rej) => {
  setTimeout(() => {
    console.log(8)
  })
  console.log(7)
  res()
}).then(() => {
  console.log(9)
})
f1()