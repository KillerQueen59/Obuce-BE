const bcrypt = require('bcrypt')

exports.comparePassword = async function (password, hashed) {
  const match = await bcrypt.compare(password, hashed)
  return match
}

exports.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10)
}