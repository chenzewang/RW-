<!--
 * @Author: your name
 * @Date: 2020-02-26 12:37:14
 * @LastEditTime: 2020-07-03 18:58:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\http\http.md
 -->
<!-- TOC -->

![](https://user-gold-cdn.xitu.io/2020/3/23/17104ea1fdee5669?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- [http 报文结构](#http-报文结构)
  - [报文首部](#报文首部)
    - [起始行](#起始行)
      - [请求报文的起始行:](#请求报文的起始行)
        - [方法(method)](#方法method)
        - [request-URL](#request-url)
        - [version(http 协议版本)](#versionhttp-协议版本)
      - [响应报文的起始行](#响应报文的起始行)
        - [HTTP 响应码](#http-响应码)
    - [请求头](#请求头)
      - [通用首部](#通用首部)
      - [请求首部](#请求首部)
      - [响应首部](#响应首部)
      - [内容首部](#内容首部)
      - [拓展首部](#拓展首部)
  - [空行](#空行)
  - [报文主体(body)](#报文主体body)
- [http 请求过程](#http-请求过程)
  - [1.建立 TCP 连接](#1建立-tcp-连接)
  - [2.浏览器向服务器发送请求命令](#2浏览器向服务器发送请求命令)
  - [3.web 服务器应答](#3web-服务器应答)
  - [4.Web 服务器关闭 TCP 连接](#4web-服务器关闭-tcp-连接)

<!-- /TOC -->

记录的比较散乱,这篇文章的思路写的很清晰,可以看这篇:

[http 报文详解------klguang](https://www.cnblogs.com/klguang/p/4618526.html)

# http 报文结构

http 报文主要包含三大部分

| 报文首部   |
| ---------- |
| 空行       |
| 主体(body) |

![](https://images0.cnblogs.com/blog2015/776887/201507/241034588189239.png)

http 报文例子:

```http
GET / HTTP/1.1
Host: www.enjoytoday.cn
Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: http://www.enjoytoday.cn/posts/326
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8
Cookie: bdshare_firstime=1466032270994; UM_distinctid=15c4ef2ac4e2e4-0d13269271b947-1b2a120b-1fa400-15c4ef2ac4f7b5; un=aGZjYWk=;

username=hfcai&sex=man
```

## 报文首部

报文首部根据是请求报文还是响应报文有所区别,所以这一节会分请求和响应来描述

### 起始行

#### 请求报文的起始行:

```
<method> <request-URL> <version>
```

方法 + URL + Http 协议版本号，他们之间用空格分隔。
该部分位于数据首行，例如：

```http
GET /index.html HTTP/1.1
```

> url 划分：
> `protocol:// hostname[:port] / path / [;parameters][?query]#fragment`

![](https://img-blog.csdnimg.cn/20191003133346229.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FkYV9sYWtl,size_16,color_FFFFFF,t_70)

##### 方法(method)

常见的几种：

- POST （向服务器发送需要处理的数据）【发送数据】增/查，
- GET（从服务器获取请求 URL 所指定的资源）【获取资源】查
- PUT（将请求的主体部分存储在服务器上）【存储数据】 改
- DELETE （从服务器上删除请求 URL 所指定的资源）【删除数据】删

##### request-URL

上面的 /index.html

##### version(http 协议版本)

- 1
- 1.1
- 2

#### 响应报文的起始行

```
<version> <status> <reason-phrase>
```

HTTP 版本、数字状态码，以及描述操作状态的文本形式的原因短语。
例如:

```http
HTTP/1.1 200 OK
```

##### HTTP 响应码

HTTP 响应码响应码由三位十进制数字组成，它们出现在由 HTTP 服务器发送的响应的第一行。
响应码分五种类型，由它们的第一位数字表示：

- 1xx：信息，请求收到，继续处理
- 2xx：成功，行为被成功地接受、理解和采纳
- 3xx：重定向，为了完成请求，必须进一步执行的动作
- 4xx：客户端错误，请求包含语法错误或者请求无法实现
- 5xx：服务器错误，服务器不能实现一种明显无效的请求

### 请求头

```http
GET / HTTP/1.1
Host: www.enjoytoday.cn  //从这里开始
Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: http://www.enjoytoday.cn/posts/326
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8
Cookie: bdshare_firstime=1466032270994; UM_distinctid=15c4ef2ac4e2e4-0d13269271b947-1b2a120b-1fa400-15c4ef2ac4f7b5; un=aGZjYWk=;  //到这里结束

username=hfcai&sex=man
```

每个请求头都有一种简单的语法：名字后面跟着冒号（：），然后跟上可选的空格，再跟上字段值，最后是一个 CRLF。（或者换行符）

#### 通用首部

这些是客户端和服务器都可以使用的通用首部。可以在客户端、服务器和其他应用程序之间提供一些非有用的通用功能。比如，Date 首部就是一个通用首部，每一端都可以用它来说明构建报文的时间和日期：

```http
Date: Tue, 3 Oct 1974 02:16:00 GMT
```

#### 请求首部

从名字中就可以看出，请求首部是请求报文特有的。它们为服务器提供了一些额外信息，比如客户端希望接收什么类型的数据。例如，下面的 Accept 首部就用
来告知服务器客户端会接受与其请求相符的任意媒体类型：
Accept: _/_

| 首部            | 描述                                                                            |
| --------------- | ------------------------------------------------------------------------------- |
| Accept          | 告诉服务器能够发送哪些媒体类型                                                  |
| Accept-Charset  | 告诉服务器能够发送哪些字符集                                                    |
| Accept-Encoding | 告诉服务器能够发送哪些编码方式                                                  |
| Authorization   | 包含了客户端提供给服务器，以便对其自身进行认证的数据                            |
| Cookie          | 客户端用它向服务器传送一个令牌——它并不是真正的安全首部，但确实隐含了安全功能 14 |
| ...             | ...                                                                             |

#### 响应首部

响应报文有自己的首部集，以便为客户端提供信息（比如，客户端在与哪种类型的服务器进行交互）。例如，下列 Server 首部就用来告知客户端它在与一个版本 1.0 的 Tiki-Hut 服务器进行交互：

```http
Server: Tiki-Hut/1.0
```

#### 内容首部

| 首部             | 描述                     |
| ---------------- | ------------------------ |
| Content-Encoding | 对主体执行的任意编码方式 |
| Content-Length   | 主体的长度或尺寸         |
| Content-Type     | 这个主体的对象类型       |
| ...              | ...                      |

#### 拓展首部

扩展首部是非标准的首部，由应用程序开发者创建，但还未添加到已批准的 HTTP 规范中去。即使不知道这些扩展首部的含义，HTTP 程序也要接受它们并对其进行转发。

## 空行

空行用于分隔首部和报文主体

## 报文主体(body)

要传输的数据
例子:(下面的 html 标签即为请求体)

```http
HTTP/1.1 200 OK
  Date: Sat, 01 Jul 2017 14:51:26 GMT
  Server: Apache/2.4.7 (Ubuntu)
  Set-Cookie: JSESSIONID=84C993F5E433C4DE9BFBA57150FFC065.ajp13_worker;path=/;HttpOnly
  Content-Language: zh-CN
  Vary: Accept-Encoding
  Content-Encoding: gzip
  Content-Length: 7333
  Keep-Alive: timeout=5, max=100
  Connection: Keep-Alive
  Content-Type: text/html;charset=UTF-8

  <html>
  <head>
  <title>title of html.</html>
  </head>
  <body>
  <h1>Hello world!</h1>
  </body>
  </html>
```

# http 请求过程

## 1.建立 TCP 连接

1. 通过 dns 找到 ip
2. 与主机进行三次握手建立 tcp 链接
   > 这里复习一下
   > ![](https://img-blog.csdn.net/20160717204340046) > ![](https://img-blog.csdn.net/20160717210625774)

## 2.浏览器向服务器发送请求命令

一旦建立了 TCP 连接，Web 浏览器就会向 Web 服务器发送请求命令。例如：GET/hello/index.jsp HTTP/1.1。浏览器发送其请求命令之后，还要以头信息的形式向 Web 服务器发送一些别的信息(例：Accept ,User-Agent 等 )，之后浏览器发送了一空白行来通知服务器，它已经结束了该头信息的发送。

## 3.web 服务器应答

客户机向服务器发出请求后，服务器会客户机进行应答，应答内容包括：协议的版本号和应答状态码 ：HTTP/1.1 200 OK，响应头信息来记录服务器自己的数据，被请求的文档内容。最后发送一个空白行来表示头信息的发送到此为结束，接着以 Content-Type 响应头信息所描述的格式发送用户所请求的实际数据。

## 4.Web 服务器关闭 TCP 连接

一般情况下，一旦 Web 服务器向浏览器发送了请求的数据，它就要关闭 TCP 连接，但是如果浏览器或者服务器在其头信息加入了这行代码：Connection:keep-alive(想起来 vue 有个 keep-alive 组件)

TCP 连接在发送后将仍然保持打开状态，于是，浏览器可以继续通过相同的连接发送请求。保持连接节省了为每个请求建立新连接所需的时间，还节约了网络带宽。

连接释放:四次挥手
![](https://img-blog.csdn.net/20160717212037594)
