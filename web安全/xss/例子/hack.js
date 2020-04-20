/*
 * @Author: your name
 * @Date: 2020-03-22 10:41:57
 * @LastEditTime: 2020-03-22 11:33:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\web安全\xss\例子\hack.js
 */

const fs = require('fs')
const http = require("http")
const qs = require('querystring')
const path = require('path')
let html = fs.readFileSync(path.resolve(__dirname, './test.html'));
// let img = fs.readFileSync(path.resolve(__dirname, './img/test.png'));


http.createServer((req, res) => {


  const url = req.url.split("?")[0]
  const query = req.url.split("?")[1]
  console.log("receive a request by url = ", url);
  console.log("the query = ", req.url);


  if (url == '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      "set-cookie": "testXss=123456"
      // 'Cache-Control': 'no-store'
    });
    res.end(html);
  } else if (url == '/test') {
    var data = qs.parse(query)
    res.end(JSON.stringify(data))
  }



}).listen(1111)