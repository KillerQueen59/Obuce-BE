exports.generateRandStr = function (len = 5) {
  return [...Array(len)]
    .map((_i) => (~~(Math.random() * 36)).toString(36))
    .join('')
}
