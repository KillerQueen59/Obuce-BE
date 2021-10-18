const log = require('./log')
/**
 * Object yang dikirim saat gagal
 */
const failedResult = Object.freeze({
  result: false,
})

/**
 * Fungsi general untuk mengirim response
 * @param {object} res response object dari express js
 * @param {integer} status kode status http
 * @param {any} content konten yang ingin dikirim ke client
 * @param {string} message pesan yg ingin dikirim ke client
 */
const Handler = (res, status, content = {}, message = '') => {
  const object = { ...content }
  if (!!message) object.message = message

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')

  return res.status(status).json(object)
}

/**
 * [Tidak digunakan diluar file] Response saat request tidak sesuai dengan yg diminta
 * @param {object} res response object dari express js
 * @param {error} err object error yang di throw oleh program
 */
const BadRequest = (res, err) => {
  return Handler(res, 400, failedResult, err.message)
}

/**
 * [Tidak digunakan diluar file] Response saat akses dilarang
 * @param {object} res response object dari express js
 * @param {error} err object error yang di throw oleh program
 */
const Forbidden = (res, err) => {
  return Handler(res, 403, failedResult, err.message)
}

/**
 * [Tidak digunakan diluar file] Response saat resource tidak ditemukan
 * @param {object} res response object dari express js
 * @param {error} err object error yang di throw oleh program
 */
const NotFound = (res, err) => {
  return Handler(res, 404, failedResult, err.message)
}

/**
 * [Tidak digunakan diluar file] Response saat server mengalami error
 * @param {object} res response object dari express js
 * @param {error} err object error yang di throw oleh program
 */
const ServerError = (res, err) => {
  return Handler(res, 500, failedResult, err.message)
}

/**
 * Response general error
 * @param {object} res response object dari express js
 * @param {error} err object error yang di throw oleh program
 */
exports.Error = (res, err) => {
  log.debug(err)
  // console.error(err.stack)

  switch (true) {
    case err instanceof TypeError:
      return BadRequest(res, err)

    case err instanceof ReferenceError:
      return NotFound(res, err)

    case err instanceof RangeError:
      return Forbidden(res, err)

    default:
      return ServerError(res, err)
  }
}

/**
 * Response saat sukses
 * @param {object} res response object dari express js
 * @param {error} err object error yang di throw oleh program
 */
exports.Success = (res, content, msg) => {
  const result = res.locals.result || content
  const message = res.locals.message || msg

  const isTypeObject = typeof result === 'object'
  const isNotNull = !!result
  const isNotEmptyObject = Object.keys(result).length > 0

  if (isTypeObject && isNotNull && isNotEmptyObject)
    return Handler(res, 200, result, message)

  return Handler(res, 200, { result }, message)
}
