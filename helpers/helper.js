export function splitArrayBasedOnProp(arr, prop) {
  const arr1 = [];
  const arr2 = [];
  arr.forEach(elm => {
    elm[prop] ? arr1.push(elm) : arr2.push(elm)
  })
  return [arr1, arr2]
}