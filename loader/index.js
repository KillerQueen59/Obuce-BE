const mongoose = require('./mongoose')
const morgan = require('./morgan')
const express = require('./express')
const socket = require('./socket')

module.exports = async (app) => {
  try {
    // mongoose loader
    await mongoose()

    // logger loader
    await morgan(app)

    // express loader
    await express(app)

    // socket loader
    const server = await socket(app)

    return Promise.resolve(server)
  } catch (err) {
    return Promise.reject(err)
  }
}
