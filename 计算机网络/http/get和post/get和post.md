<!--
 * @Author: your name
 * @Date: 2020-03-11 09:34:04
 * @LastEditTime: 2020-07-05 14:28:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\http\get和post\get和post.md
 -->

GET 的语义是请求获取指定的资源。GET 方法是安全、幂等、可缓存的（除非有 Cache-Control Header 的约束）,GET 方法的报文主体没有任何语义。

POST 的语义是根据请求负荷（报文主体）对指定的资源做出处理，具体的处理方式视资源类型而不同。POST 不安全，不幂等，（大部分实现）不可缓存。为了针对其不可缓存性，有一系列的方法来进行优化，以后有机会再研究。

[RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

---

> post 发两个请求？是跨域的原因吧
> 浏览器发起跨域请求分两种：一种是 simple，另一种需要 preflight。如果进行 preflight 了，你就会看到两次请求，一个 OPTION，另一个就是你的跨域请求。
> 总的来说就是你的请求浏览器不知道是否被允许，需要发送 OPTION 请求提前查看下。prefight 参见 MDN
