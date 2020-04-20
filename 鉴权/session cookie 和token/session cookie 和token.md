<!--
 * @Author: your name
 * @Date: 2020-04-08 10:03:24
 * @LastEditTime: 2020-04-08 10:27:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\鉴权\session cookie 和token\session cookie 和token.md
 -->

# 什么是 cookie 和 session

## cookie

不多说

## session

session 不是实体存在的，它基于 cookie 实现，比如说 java 进行请求会在 cookie 中带上 jsessionid 为：

```http
set-cookie:jsessionid=lk123hkfgol12yi3oia; ......
```

而服务器中可能存储的是这样的数据：

```json
session:{
  "jsessionid 1":"username=riwang",
  "jsessionid 2":"username=zhangsan",
  "jsessionid 3":"username=李四",
  ...
}
```

`request.getSession()`则从当前请求 req 中拿到 cookie 中的 jsession 字段，在上面的 session 中拿到相同的的 jsessionid 对应的数据。
