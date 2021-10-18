const jwt = require('jsonwebtoken')
const util = require('../helper/util')

exports.decodeJWT = async function decodeJWT(token = '') {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET)
  if (decoded.i.slice(0, decoded.i.length - 5) !== process.env.JWT_IDENTIFIER)
    return null
  else return decoded.u
}

exports.generateJWT = async function generateJWT(id) {
  const rand = util.generateRandStr(5)
  return await jwt.sign(
    { u: id, i: `${process.env.JWT_IDENTIFIER}${rand}` },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  )
}
