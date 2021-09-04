/*
 * @Author: your name
 * @Date: 2020-07-07 11:50:26
 * @LastEditTime: 2020-07-07 11:54:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\JavaScript笔记\promise\promise20行\promise20行.js
 */
// 作者： 晨曦时梦见兮
// 链接： https: //juejin.im/post/5e6f4579f265da576429a907
//   来源： 掘金
// 著作权归作者所有。 商业转载请联系作者获得授权， 非商业转载请注明出处。

function Promise(fn) {
  this.cbs = [];

  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.cbs.forEach((cb) => cb(value));
    });
  }

  fn(resolve.bind(this));
}

Promise.prototype.then = function (onResolved) {
  return new Promise((resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);
      if (res instanceof Promise) {
        res.then(resolve);
      } else {
        resolve(res);
      }
    });
  });
};

// 使用：
new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 500);
  })
  .then((res) => {
    console.log(res);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, 500);
    });
  })
  .then(console.log);