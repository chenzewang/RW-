<!--
 * @Author: your name
 * @Date: 2020-03-19 17:37:49
 * @LastEditTime: 2020-07-05 14:48:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\计算机网络\http\http状态码\http状态码.md
 -->

<!-- TOC -->

- [100+](#100)
- [200+](#200)
  - [200 成功 OK](#200-成功-ok)
  - [206 (Partial Content)](#206-partial-content)
- [300+](#300)
  - [301 永久重定向](#301-永久重定向)
  - [302 http 转 https](#302-http-转-https)
  - [304 Not Modified](#304-not-modified)
- [400+](#400)
  - [404 找不到该资源](#404-找不到该资源)
  - [405("Method Not Allowd")](#405method-not-allowd)
- [500+](#500)

<!-- /TOC -->

常见的几个状态码

# 100+

# 200+

## 200 成功 OK

## 206 (Partial Content)

客户端通过发送范围请求头 Range 抓取到了资源的部分数据"

> 解决网路问题.
> 解决大文件下载问题.
> 解决 CDN 和原始 HTTP 服务器问题.
> 使用工具例如 lftp,wget,telnet 测试断点续传.
> 测试将一个大文件分割成多个部分同时下载.

相关：

> range 请求头 例如`Range: bytes=0-1024`

# 300+

## 301 永久重定向

搜索引擎排名相关

## 302 http 转 https

## 304 Not Modified

# 400+

## 404 找不到该资源

## 405("Method Not Allowd")

# 500+
