/*
 * @Author: your name
 * @Date: 2020-03-23 23:30:59
 * @LastEditTime: 2020-03-24 00:49:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\web安全\跨域\code\api.js
 */


const fs = require('fs')
const http = require("http")
const qs = require('querystring')
const path = require('path')

http.createServer((req, res) => {

  let html = fs.readFileSync(path.resolve(__dirname, './test.html'));

  const url = req.url.split("?")[0]
  const query = req.url.split("?")[1]
  const cookies = req.headers.cookie
  var postData = "";
  req.on('data', function (data1) {
    postData += data1;
  })
  console.log("收到来自  ", url);
  if (req.method == "GET") {
    res.end(html);
  } else {

    res.setHeader("set-cookie", "testCORS")
    //跨域简单请求
    if (url == '/test2') {
      res.setHeader("Access-Control-Allow-Origin", "*")

      req.on("end", function () {
        res.end(postData);
      })
    }

    if (url == '/test3') {
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Access-Control-Allow-Headers", "*")
      req.on("end", function () {
        res.end(postData);
      })
    }

    if (url == '/test4') {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin)
      res.setHeader("Access-Control-Allow-Headers", "content-type") //这里设置为*浏览器会报错
      res.setHeader("Access-Control-Allow-Credentials", true)
      req.on("end", function () {
        res.end(`postBody是${postData} |||||| cookies是${cookies}`);
      })
    }

  }
}).listen(3333)