/*
 * @Author: your name
 * @Date: 2020-03-13 11:11:05
 * @LastEditTime: 2020-03-13 11:18:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\模块机制\myModules.js
 */
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }
  return {
    define: define,
    get: get
  };
})();

MyModules.define("bar", [], function () {
  function hello(who) {
    return "Let me introduce: " + who;
  }
  return {
    hello: hello
  };
});
MyModules.define("foo", ["bar"], function (bar) {
  var hungry = "hippo";

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }
  return {
    awesome: awesome
  };
});
var bar = MyModules.get("bar");
var foo = MyModules.get("foo");
console.log(bar.hello("hippo")); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO