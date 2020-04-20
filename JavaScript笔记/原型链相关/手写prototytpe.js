/*
 * @Author: your name
 * @Date: 2020-03-18 11:57:07
 * @LastEditTime: 2020-03-18 12:10:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\原型链相关\prototytpe.js
 */
function SuperType(){
  this.SuperAttr = "SuperAttr属性值"
}
SuperType.prototype.SuperFunc=function(arg1){
  console.log(arg1);
}

function SubType(){
  SuperType.apply(this)
  this.subAttr = "属性值subAttr"
}
SubType.prototype = SuperType.prototype
SubType.prototype.constructor=SubType
SubType.prototype.SubFunc = function (arg1) {
  console.log(arg1);
}
SubType.__proto__=SuperType.prototype

var instanceaa=new SubType()
instanceaa.SuperFunc('asd')



