/*
 * @Author: your name
 * @Date: 2020-03-20 15:35:31
 * @LastEditTime: 2020-03-20 15:39:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\算法\排序\test.js
 */

function Sum_Solution(n) {
  // write code here
  console.log(n);
  
  return n >= 0 ? Sum_Solution(n - 1)+n : n
}
console.log(Sum_Solution(10));

