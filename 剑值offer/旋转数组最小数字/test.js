/*
 * @Author: your name
 * @Date: 2020-03-21 21:09:27
 * @LastEditTime: 2020-05-21 18:57:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\剑值offer\旋转数组最小数字\test.js
 */

//  1
function minNumberInRotateArray(rotateArray) {
  // write code here
  if (rotateArray.length == 0) {
    return 0
  }
  if (rotateArray.length == 1) {
    return rotateArray[0]
  }
  var i
  for (i = 0; i < rotateArray.length; i++) {
    if (rotateArray[i] > rotateArray[i + 1]) {
      rotateArray.push(rotateArray[i])
      break
    } else {
      rotateArray.push(rotateArray[i])
    }
  }
  // console.log(rotateArray);

  return rotateArray.slice(i + 1)[0]
}


// console.log(minNumberInRotateArray([3, 4, 5, 1, 2]));


module.exports = {
  minNumberInRotateArray: minNumberInRotateArray
};



function minNumberInRotateArray2(rotateArray) {
  new Error(rotateArray)
  if (rotateArray.length == 0) {
    return 0
  }
  if (rotateArray.length == 1) {
    return rotateArray[0]
  }
  rotateArray.sort()
  return rotateArray[0]
}

console.log(minNumberInRotateArray2([3, 4, 5, 1, 2]));