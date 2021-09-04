/*
 * @Author: your name
 * @Date: 2020-07-06 16:16:12
 * @LastEditTime: 2020-07-06 16:16:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\算法\异步求和\异步求和.js
 */

function sum(...args) {
  let start = 0
  let result = 0
  let count = 0

  function _sum(resolve) {
    count++
    new Promise((r, j) => {
        let a = args[start++]
        let b = args[start++]
        a = a !== undefined ? a : 0
        b = b !== undefined ? b : 0
        asyncAdd(a, b, (context, sum) => {
          r(sum)
        })

        if (start < args.length) {
          _sum(resolve)
        }
      })
      .then(sum => {
        result += sum
        count--
        if (count == 0) resolve(result)
      })
  }

  return new Promise((resolve, reject) => {
    if (!args || !args.length) return resolve(0)
    if (args.length == 1) return resolve(args[0])
    _sum(resolve)
  })
}