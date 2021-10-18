const chalk = require('chalk')
const response = require('./response')

const borderLength = 64
const borderOuter = function () {
  console.log(chalk.hex('#5edcff')('='.repeat(borderLength)))
}
const borderInner = function () {
  console.log(chalk.hex('#5edcff')('-'.repeat(borderLength)))
}

function PrintNicer(title, value, isTabular = true) {
  console.log(chalk.hex('#fcba03')(`> ${title}`))

  if (isTabular) console.table(value)
  else console.dir(value)

  borderInner()
}

function PrintoutError(err, req) {
  borderOuter()
  borderInner()

  PrintNicer('Endpoint', `[${req.method}] ${req.url}`, false)
  PrintNicer('Route', req.route, false)
  PrintNicer('Headers', req.headers)
  PrintNicer('Queries', req.query)
  PrintNicer('Body', req.body)

  if (req.file || req.files) {
    PrintNicer('File', !!req.file ? req.file : req.files)
  }

  console.log(chalk.hex('#ff4640')(err.stack))

  borderInner()
  borderOuter()
}

/**
 * Fungsi untuk log saat ada error
 * @param {object} err express error
 * @param {object} req express request
 * @param {object} res express response
 * @param {function} next express next function
 */
exports.ErrorLog = (err, req, res, next) => {
  if (res.headersSent) return

  if (process.env.NODE_ENV === 'development' && !!err) {
    PrintoutError(err, req)
  }
  next(err)
}

/**
 * Fungsi untuk try catch pada controller
 * @param {function} fn controller function
 */
exports.Catcher = (fn) =>
  function catcher(...args) {
    const next = args[args.length - 1]
    return Promise.resolve(fn(...args)).catch(next)
  }

/**
 * Fungsi untuk mengirim response error
 * @param {object} err express error
 * @param {object} _req express request
 * @param {object} res express response
 * @param {function} _next express function
 */
exports.SendResponse = (err, req, res, _next) => {
  if (err) return response.Error(res, err)

  if (req.method === 'GET') {
    res.locals.result = true
    res.locals.message = ''
  }

  return response.Success(res)
}
