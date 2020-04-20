/*
 * @Author: your name
 * @Date: 2020-03-10 22:53:06
 * @LastEditTime: 2020-03-10 23:13:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\数组去重\test.js
 */
function uniqueArray1(ar) {
  var j = {};

  ar.forEach(function (v) {
    j[v + '::' + typeof v] = v;
  });
  console.log(j);
  
  return Object.keys(j).map(function (v) {
    console.log(v);
    
    return j[v];
  });
}

console.log(uniqueArray1([1, 1, undefined, undefined, 4, 2, "2",{
  name: "111",
  1: 1
}]))