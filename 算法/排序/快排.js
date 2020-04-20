/*
 * @Author: your name
 * @Date: 2020-03-19 13:06:19
 * @LastEditTime: 2020-03-19 15:26:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\算法\排序\快排.js
 */
var arr = [72, 6, 57, 88, 60, 42, 83, 73, 48, 85]


function main() {
  if (arr == null || arr.length < 2) {
    return;
  }
  fastSort(arr, 0, arr.length - 1);

}
main()
console.log(arr);

function fastSort(arr, left, right) {

  if (left < right) {
    var mid = partition(arr, left, right)
    //排序mid左边的
    fastSort(arr, left, mid - 1);
    //排序mid右边的
    fastSort(arr, mid + 1, right);
  }
}


function partition(arr, left, right) { //一趟排序   //返回基准值在数组中的正确位置（左边比基准值小，右边比基准值大）
  let baseline = arr[left]; //基准值
  console.log("left:" + left + "right:"+right);
  // console.log(right);

  
  while (left < right) { //左右不同，继续 对比-交换过程
    while (true) { //右指针的值比基准值大的时候，继续缩小右边界。
      right--

      if (arr[right] < baseline) {
        arr[left] = arr[right]
        break
      }
      if (left >= right) {
        break
      }
    }
    
    while (true) { //左指针的值比基准值小的时候，继续缩小左边界。
      left++
      
      if (arr[left] > baseline) {
        arr[right] = arr[left]
        break
      }
      if (left >= right) {
        break
      }
    }
  }
  arr[left] = baseline //把基准值放到正确位置
  return left
}
