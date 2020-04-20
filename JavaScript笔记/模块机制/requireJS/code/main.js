/*
 * @Author: your name
 * @Date: 2020-03-26 19:55:22
 * @LastEditTime: 2020-03-26 19:57:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\模块机制\requireJS\code\main.js
 */

// main.js文件
(function () {
  require.config({
    baseUrl: './', //基本路径 出发点在根目录下
    paths: {
      //映射: 模块标识名: 路径
      alerter: './modules/alerter', //此处不能写成alerter.js,会报错
      dataService: './modules/dataService'
    }
  })
  require(['alerter'], function (alerter) {
    alerter.showMsg()
  })
})()