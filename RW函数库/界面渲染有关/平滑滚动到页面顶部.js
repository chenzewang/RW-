/*
 * @Author: your name
 * @Date: 2020-03-12 15:26:12
 * @LastEditTime: 2020-03-12 15:45:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RW 笔记\RW函数库\界面渲染有关\平滑滚动到页面顶部.js
 */
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8); 
  }
}

// 笔记：
//1 window.scrollTo()只会滚动至整数位置，当他的第二个参数为0.x时，就可以滚到最上面了,不会死循环 
//2 window.requestAnimationFrame  https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
    // https: //blog.csdn.net/vhwfr2u02q/article/details/79492303

// 示例
// scrollToTop()