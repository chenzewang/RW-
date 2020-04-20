/*
 * @Author: your name
 * @Date: 2020-03-23 21:40:10
 * @LastEditTime: 2020-03-24 00:37:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\web安全\跨域\code\server.js
 */


const fs = require('fs')
const http = require("http")
const qs = require('querystring')
const path = require('path')

http.createServer((req, res) => {
  let html = fs.readFileSync(path.resolve(__dirname, './test.html'));
  const url = req.url.split("?")[0]
  const query = req.url.split("?")[1]
  req.on('data', function (data1) {
    postData += data1;
  })
  console.log("收到来自  ", url);
  if (req.method == "GET") {
    if (url == '/') {
      //返回html模板
      res.setHeader('set-cookie', "testCORS=riwang") //设置cookie，后面发送带cookie的请求时使用
      res.end(html);
    } else if (url == '/test1') {
      //不跨域请求
      res.end(query)
    }
  }
}).listen(2222)