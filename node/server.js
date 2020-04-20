/*
 * @Author: your name
 * @Date: 2020-03-21 00:31:16
 * @LastEditTime: 2020-04-04 10:28:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\node\test.js
 */
const http = require("http")
http.createServer(function (req, res) {
  let data = {
    test: "test"
  }
  const url = req.url
  if (url == "/test") {
    console.log(111);

    data = {
      url: "Test"
    }
    res.end(JSON.stringify(data))
  } else if (url == "/nnn") {
    data = {
      url: "1111"
    }
    res.end(JSON.stringify(data))
  } else {
    res.end(JSON.stringify(data))
  }
}).listen(8888)