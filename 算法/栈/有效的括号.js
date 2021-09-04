/*
 * @Author: your name
 * @Date: 2020-07-16 10:55:55
 * @LastEditTime: 2020-07-16 11:35:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\算法\栈\有效的括号.js
 */



var isValid = function (s) {

  //判断是奇数时直接return false
  if (s.length % 2 === 1) {
    return false
  }

  var stack = []; //栈
  var top
  const matchSet = {
    ")": "(",
    "]": "[",
    "}": "{"
  }

  for (let i = 0; i < s.length; i++) {

    //栈为空的时候直接入栈
    if (stack.length === 0) {
      stack.push(s[i])
      continue
    }

    top = stack[stack.length - 1]
    if (top === matchSet[s[i]]) {
      stack.pop()
    } else {
      stack.push(s[i])
    }
  }
  return stack.length === 0
};

console.log(isValid("([{}()])"));