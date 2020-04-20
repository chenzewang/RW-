/*
 * @Author: your name
 * @Date: 2020-03-26 19:55:41
 * @LastEditTime: 2020-03-26 19:56:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\模块机制\requireJS\code\modules\alerter.js
 */


//alerter.js文件
// 定义有依赖的模块
define(['dataService'], function (dataService) {
  let name = 'Tom'

  function showMsg() {
    alert(dataService.getMsg() + ', ' + name)
  }
  // 暴露模块
  return {
    showMsg
  }
})