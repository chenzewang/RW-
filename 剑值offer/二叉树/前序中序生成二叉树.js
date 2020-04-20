/*
 * @Author: your name
 * @Date: 2020-03-21 20:52:52
 * @LastEditTime: 2020-03-21 20:53:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\剑值offer\二叉树\前序中序生成二叉树.js
 */
/*
 * @Author: your name
 * @Date: 2020-03-21 19:51:24
 * @LastEditTime: 2020-03-21 20:51:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\剑值offer\替换空格\test.js
 */
function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
}

function reConstructBinaryTree(pre, vin) {
  // write code here

  if (pre.length == 0) {
    return null
  }

  try {
    var headNode = new TreeNode(pre[0]) || null
    var headNodePosintionInVin
    for (let i = 0; i < vin.length; i++) {
      if (vin[i] == headNode.val) {
        headNodePosintionInVin = i
      }
    }
    var newPre_left = []
    var newVin_left = vin.slice(0, headNodePosintionInVin)
    for (let i = 0; i < pre.length; i++) {
      if (newVin_left.indexOf(pre[i]) > -1) {
        newPre_left.push(pre[i])
      }
    }

    var newPre_right = []
    var newVin_right = vin.slice(headNodePosintionInVin + 1)
    for (let i = 0; i < pre.length; i++) {
      if (newVin_right.indexOf(pre[i]) > -1) {
        newPre_right.push(pre[i])
      }
    }

  } catch (err) {
    console.log(err);

  } finally {
    headNode.left = reConstructBinaryTree(newPre_left, newVin_left) || null
    headNode.right = reConstructBinaryTree(newPre_right, newVin_right) || null
    return headNode || null
  }
}

var left = [1, 2, 4, 7, 3, 5, 6, 8]
var right = [4, 7, 2, 1, 5, 3, 8, 6]
console.log(reConstructBinaryTree(left, right));

function read(headNode) {
  if (headNode) {
    console.log(headNode.val);
  }
  if (headNode.left) {
    read(headNode.left)
  }
  if (headNode.right) {
    read(headNode.right)
  }
}
read(reConstructBinaryTree(left, right))