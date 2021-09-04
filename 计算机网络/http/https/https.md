<!--
 * @Author: your name
 * @Date: 2020-02-26 13:47:39
 * @LastEditTime: 2020-07-03 12:27:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\http\https\https.md
 -->

没有在自己的网站使用过,纯为了解以及笔记

[深入理解 HTTPS 工作原理](https://segmentfault.com/a/1190000018992153)
[白话解释系列](https://segmentfault.com/blog/baihua)

<!-- TOC -->

- [HTTPS 协议](#https-协议)
- [https 具体加密过程](#https-具体加密过程)
- [证书是什么](#证书是什么)
- [非对称加密的算法](#非对称加密的算法)
  - [RSA](#rsa)
- [对称加密的算法](#对称加密的算法)
  - [EDS](#eds)
  - [3DES](#3des)
  - [AES](#aes)
- [https 缺点](#https-缺点)
  - [耗时上会比 http 多一些](#耗时上会比-http-多一些)
  - [早期的 ssl 不支持虚拟主机](#早期的-ssl-不支持虚拟主机)
  - [怎么解决缺点](#怎么解决缺点)
    - [keep-alive](#keep-alive)

<!-- /TOC -->

# HTTPS 协议

HTTPS 协议可以理解为 HTTP 协议的升级，就是在 HTTP 的基础上增加了数据加密(即 HTTP 下加入**SSL（Secure Sockets Layer 安全套接层）**)。在数据进行传输之前，对数据进行加密，然后再发送到服务器。这样，就算数据被第三者所截获，但是由于数据是加密的，所以你的个人信息让然是安全的。这就是 HTTP 和 HTTPS 的最大区别。

# https 具体加密过程

[对称加密与非对称加密](https://www.cnblogs.com/lakei/p/11165987.html)

- 客户端向服务器发起 HTTPS 请求，连接到服务器的 443 端口(默认)
- 服务器端有一个密钥对，即公钥和私钥，是用来进行非对称加密使用的，服务器端保存着私钥，不能将其泄露，公钥可以发送给任何人

  > - 对称加密: 加密和解密的秘钥使用的是同一个.
  > - 非对称加密: 与对称加密算法不同，非对称加密算法需要两个密钥：公开密钥（publickey）和私有密钥（privatekey）。

  > 服务器生成一对密钥并将其中的一把作为公用密钥向其它方公开；得到该公用密钥的客户端使用该密钥对机密信息进行加密后再发送给服务器；服务器再用自己保存的另一把专用密钥对加密后的信息进行解密。服务器只能用其专用密钥解密由其公用密钥加密后的任何信息。

- 服务器将自己的公钥发送给客户端,客户端收到服务器端的公钥之后，会对公钥进行检查，验证其合法性，如果发现发现公钥有问题，那么 HTTPS 传输就无法继续。**严格的说，这里应该是验证服务器发送的数字证书的合法性，关于客户端如何验证数字证书的合法性**。如果公钥合格，那么客户端会生成一个随机值，这个随机值就是用于进行对称加密的密钥，我们将该密钥称之为 client key，即客户端密钥，这样在概念上和服务器端的密钥容易进行区分。然后用服务器的公钥对客户端密钥进行非对称加密，这样客户端密钥就变成密文了，至此，HTTPS 中的第一次 HTTP 请求结束

- 客户端会发起 HTTPS 中的第二个 HTTP 请求，将加密之后的客户端密钥发送给服务器
- 服务器接收到客户端发来的密文之后，会用自己的私钥对其进行非对称解密，解密之后的明文就是客户端密钥，然后用客户端密钥对数据进行对称加密，这样数据就变成了密文
- 然后服务器将加密后的密文发送给客户端
- 客户端收到服务器发送来的密文，用客户端密钥对其进行对称解密，得到服务器发送的数据。这样 HTTPS 中的第二个 HTTP 请求结束，整个 HTTPS 传输完成

# 证书是什么

![https://juejin.im/post/59e4c02151882578d02f4aca](https://user-gold-cdn.xitu.io/2017/10/16/808f41fbb63ec6f3397288368160c7a6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
怎么验证证书？
![](https://user-gold-cdn.xitu.io/2017/10/16/be5e7b8e6b17fed4edf31dbf4ee65117?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# 非对称加密的算法

## RSA

> 密文 = 明文^E mod N （RSA 加密）
> E 和 N 的组合是公钥。

> 密文 = 明文^D mod N （RSA 解密）
> D 和 N 的组合就是私钥。

# 对称加密的算法

## EDS

## 3DES

## AES

# https 缺点

## 耗时上会比 http 多一些

额外的握手以及计算任务（生成秘钥、加密解密等计算，包括客户端和服务端）会产生更多的耗时。不过再次访问同一个 https 的 domain，浏览器将重用该连接并缓存 SSL 会话，以允许快速恢复通信。

## 早期的 ssl 不支持虚拟主机

即从同一个 服务器 ip 提供多个域名。这方面的协议在 2004 年有了支持，但是老的浏览器如 ie6 ie7 会有这些问题

## 怎么解决缺点

### keep-alive

- 尽可能在 HTTPS 连接上启用 Keep-Alive。 为页面中的每个对象重新建立 SSL 会话会降低性能。 但也请注意启用 Keep-Alive 可以对您的 Web 服务器扩展产生什么影响。 在高流量站点上，它将是站不住脚的（因此请参阅＃2）。

* Make sure you understand how your site is being cached. It makes a huge difference in perceived performance.

- If you can afford to use a tiered architecture with a dedicated SSL terminator in front of your web server tier, you will enjoy better horizontal scaling. It needn't even be hardware - a dedicated software SSL terminator will still give you more cache hits and faster session resumes, and make it easier to scale your web tier.
