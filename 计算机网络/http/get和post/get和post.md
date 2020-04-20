<!--
 * @Author: your name
 * @Date: 2020-03-11 09:34:04
 * @LastEditTime: 2020-03-11 10:15:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\http\get和post\get和post.md
 -->
GET的语义是请求获取指定的资源。GET方法是安全、幂等、可缓存的（除非有 Cache-ControlHeader的约束）,GET方法的报文主体没有任何语义。

POST的语义是根据请求负荷（报文主体）对指定的资源做出处理，具体的处理方式视资源类型而不同。POST不安全，不幂等，（大部分实现）不可缓存。为了针对其不可缓存性，有一系列的方法来进行优化，以后有机会再研究（FLAG已经立起）。


[RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)