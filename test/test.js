function merge2Array5(origin) {
  const result = [];
  const tagObj = {};
  for (const i of origin) {
    if (!tagObj[i]) {
      result.push(i);
      tagObj[i] = 1;
    }
  }
  return result;
}
var params = [
  1,
  "1",
  2,
  2,
  {
    a: 1
  },
  {
    a: 1
  }
]

console.log(merge2Array5(params));