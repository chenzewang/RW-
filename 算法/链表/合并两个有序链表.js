/*
 * @Author: your name
 * @Date: 2020-07-18 22:21:15
 * @LastEditTime: 2020-07-20 09:42:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\算法\链表\合并两个有序链表.js
 */

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var mergeTwoLists = function (l1, l2) {
  let new_head = new ListNode()
  let new_tail = new_head
  while (l1 != null && l2 != null) {
    console.log("-------------------------");
    if (l1 == null) {
      new_tail.next = l2
      return new_head
    }
    if (l2 == null) {
      new_tail.next = l1
      return new_head
    }

    console.log(l1.val >= l2.val);

    if (l1.val >= l2.val) {
      console.log(1);
      if (new_head.val!==0) {
        console.log(1.1);
        new_tail.next = l2
        l2 = l2.next
        new_tail = new_tail.next
      } else { //是第一个的情况
        console.log(1.2);
        new_head = l2
        l2 = l2.next
      }
    } else {
      console.log(2);
      if (new_head.val!==0) {
        console.log(2.1);
        new_tail.next = l1
        l1 = l1.next
        new_tail = new_tail.next
      } else { //是第一个的情况
      console.log(2.2);
        new_head = l1
        l1 = l1.next
      }
    }

  }

  return new_head

};

let l1 = new ListNode(1, new ListNode(2, new ListNode(4)))
let l2 = new ListNode(1, new ListNode(3, new ListNode(4)))
console.log(mergeTwoLists(l1, l2));