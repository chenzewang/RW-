/*
 * @Author: your name
 * @Date: 2020-03-21 19:51:24
 * @LastEditTime: 2020-03-21 20:54:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\剑值offer\替换空格\test.js
 */
function replaceSpace(str)
{
    return str.replace(/\s/g, "%20")
}

console.log(replaceSpace("hello word"));


// module.exports = {
//     replaceSpace : replaceSpace
// };