<!--
 * @Author: your name
 * @Date: 2020-03-19 17:37:49
 * @LastEditTime: 2020-03-19 21:52:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\计算机网络\http\http状态码\http状态码.md
 -->

<!-- TOC -->

- [100+](#100)
- [200+](#200)
  - [200 成功 OK](#200-%e6%88%90%e5%8a%9f-ok)
  - [206  (Partial Content)](#206-partial-content)
- [300+](#300)
  - [301 永久重定向](#301-%e6%b0%b8%e4%b9%85%e9%87%8d%e5%ae%9a%e5%90%91)
  - [302 http转https](#302-http%e8%bd%achttps)
  - [304 Not Modified](#304-not-modified)
- [400+](#400)
  - [404 找不到该资源](#404-%e6%89%be%e4%b8%8d%e5%88%b0%e8%af%a5%e8%b5%84%e6%ba%90)
  - [405("Method Not Allowd")](#405%22method-not-allowd%22)
- [500+](#500)

<!-- /TOC -->
常见的几个状态码

# 100+


# 200+
## 200 成功 OK

## 206  (Partial Content)
客户端通过发送范围请求头Range抓取到了资源的部分数据"
>解决网路问题.
解决大文件下载问题.
解决CDN和原始HTTP服务器问题.
使用工具例如lftp,wget,telnet测试断点续传.
测试将一个大文件分割成多个部分同时下载.

相关：
>range请求头  例如`Range: bytes=0-1024`

# 300+

## 301 永久重定向
搜索引擎排名相关

## 302 http转https 

## 304 Not Modified 


# 400+

## 404 找不到该资源

## 405("Method Not Allowd")
# 500+
