const getUnique = (array) => {
  return array.filter((val, index, arr) => {
    if (arr[index]){
      return arr.indexOf(val) == index;
    }
})
}

module.exports = getUnique;