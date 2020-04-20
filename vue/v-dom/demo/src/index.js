/*
 * @Author: your name
 * @Date: 2020-03-24 10:21:29
 * @LastEditTime: 2020-03-25 13:20:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\vue\v-dom\demo\src\index.js
 */
// /*
//  * @Author: your name
//  * @Date: 2020-03-24 10:21:29
//  * @LastEditTime: 2020-03-24 12:35:49
//  * @LastEditors: Please set LastEditors
//  * @Description: In User Settings Edit
//  * @FilePath: \RW 笔记\vue\v-dom\virtual-dom\test.js
//  */
// // require('virtual-dom/index')
// var VNode = require("virtual-dom/dist/virtual-dom").VNode
// var createElement = require("virtual-dom/dist/virtual-dom").create

// var Hook = function () {}
// Hook.prototype.hook = function (elem, key, previousValue) {
//     console.log("Hello from " + elem.id + "!\nMy key was: " + key)
// }

// var tagName = "div"
// var style = "width: 100px; height: 100px; background-color: #FF0000;"
// var attributes = {
//     "class": "red box",
//     style: style
// }
// var key = "my-unique-red-box"
// var namespace = "http://www.w3.org/1999/xhtml"
// var properties = {
//     attributes: attributes,
//     id: "my-red-box",
//     "a hook can have any property key": new Hook()
// }
// var childNode = new VNode("div", {
//     id: "red-box-child"
// })

// RedBoxNode = new VNode(tagName, properties, [childNode], key, namespace)
// // console.log(RedBoxNode);
// console.log(RedBoxNode);

// RedBoxElem = createElement(RedBoxNode)
// // console.log(RedBoxElem);

// document.body.appendChild(RedBoxElem)