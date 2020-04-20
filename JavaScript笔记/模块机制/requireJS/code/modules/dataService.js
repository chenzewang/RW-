/*
 * @Author: your name
 * @Date: 2020-03-26 19:55:57
 * @LastEditTime: 2020-03-26 19:56:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\模块机制\requireJS\code\modules\dataService.js
 */
// 定义没有依赖的模块
define(function () {
  let msg = 'www.baidu.com'

  function getMsg() {
    return msg.toUpperCase()
  }
  return {
    getMsg
  } // 暴露模块
})