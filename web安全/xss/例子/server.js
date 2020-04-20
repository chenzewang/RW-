/*
 * @Author: your name
 * @Date: 2020-03-19 19:44:30
 * @LastEditTime: 2020-03-23 23:32:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\web安全\xss\例子\server.js
 */
//server.js

const fs = require('fs')
const http = require("http")
const qs = require('querystring')
const path = require('path')
let html = fs.readFileSync(path.resolve(__dirname, './test.html'));
// let img = fs.readFileSync(path.resolve(__dirname, './img/test.png'));


http.createServer((req, res) => {


  const url = req.url.split("?")[0]
  const query = req.url.split("?")[1]
  var postData = "";
  req.on('data', function (data1) {
    postData += data1;
  })

  console.log("receive a request by url = ", url);
  console.log("the query = ", query);

  if (req.method == "GET") {

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
  } else if (req.method == "POST") {

    req.on("end", function () {
      // obj = qs.parse(obj);
      console.log(postData);
      res.end(postData);
    })

  }




}).listen(3333)