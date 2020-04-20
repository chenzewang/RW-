/*
 * @Author: your name
 * @Date: 2020-04-05 09:40:24
 * @LastEditTime: 2020-04-05 09:44:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\剑值offer\菲波那切数列\test.js
 */
function Fibonacci3(n) {
  if (n == 0) {
    return 0
  }
  if (n === 1 || n === 2) {
    return 1;
  }
  let ac1 = 1,
    ac2 = 1;
  for (let i = 2; i < n; i++) {
    [ac1, ac2] = [ac2, ac1 + ac2];
  }
  return ac2;
}
console.log(Fibonacci3(2));