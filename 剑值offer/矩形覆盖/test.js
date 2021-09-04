var map = {
  0: 0,
  1: 1,
  2: 2
}

function rectCover(number) {

  if (map[number]) {
    return map[number]
  } else {
    var first = 1;
    var sec = 2;
    var sum = 0;
    for (var i = 3; i <= number; i++) {
      sum = first + sec;
      first = sec;
      sec = sum;
    }
    return sum;
  }
}

console.log(rectCover(9));

module.exports = {
  rectCover: rectCover
};