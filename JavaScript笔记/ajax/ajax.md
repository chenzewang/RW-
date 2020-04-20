<!--
 * @Author: your name
 * @Date: 2020-03-10 15:08:34
 * @LastEditTime: 2020-03-10 15:17:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\ajax\ajax.md
 -->
[MDN ajax](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX/Getting_Started)

[MDN XMLHttpRequest.readyState](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState)

|值|状态|描述|
|-|-|-|
|0|unset|代理被创建,但尚未调用open()方法|
|1|opened|open() 方法已经被触发。在这个状态中，可以通过  setRequestHeader() 方法来设置请求的头部， 可以调用 send() 方法来发起请求。|
|2|headers_received|send() 方法已经被调用，响应头也已经被接收。|
|3|loading|响应体部分正在被接收。如果 responseType 属性是“text”或空字符串， responseText 将会在载入的过程中拥有部分响应数据。|
|4|done|请求操作已经完成。这意味着数据传输已经彻底完成或失败。|
```js
var xhr = new XMLHttpRequest();
console.log('UNSENT', xhr.readyState); // readyState 为 0

xhr.open('GET', '/api', true); //触发一次onreadystatechange
console.log('OPENED', xhr.readyState); // readyState 为 1

xhr.onprogress = function () {
    console.log('LOADING', xhr.readyState); // readyState 为 3
};

xhr.onload = function () {
    console.log('DONE', xhr.readyState); // readyState 为 4
};

xhr.send(null);//触发一次onreadystatechange // readyState 为 1
```