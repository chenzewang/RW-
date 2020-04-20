/*
 * @Author: your name
 * @Date: 2020-03-20 10:29:44
 * @LastEditTime: 2020-03-20 10:31:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\设计模式\单例模式.md\单例.js
 */
function singleInstance(){
  var instance=this
  singleInstance=function(){
    return instance
  }
}

var sin=new singleInstance()
var sin2 = new singleInstance()

console.log(sin==sin2);
