const morgan = require('morgan')
const chalk = require('chalk')

module.exports = (app) => {
  const green = '#2ed573'
  const lightblue = '#8ec5de'
  const lightred = '#d17e7b'
  const orange = '#ffb142'
  const darkblue = '#1e90ff'
  const darkpurple = '#a871a8'

  app.use(
    morgan(function (tokens, req, res) {
      const logMethod = chalk.hex(lightred).bold(`[${tokens.method(req, res)}]`)
      const logUrl = chalk.hex(lightblue).bold(tokens.url(req, res))
      const logStatusCode = chalk
        .hex(green)
        .bold(`{${tokens.status(req, res)}}`)
      const logDate = `${chalk
        .hex(darkblue)
        .bold(tokens.date(req, res, 'clf'))}`
      const logUserAgent = chalk
        .hex(darkpurple)
        .bold(tokens['user-agent'](req, res))
      const logResponseTime = chalk
        .hex(orange)
        .bold(`(${tokens['response-time'](req, res)} ms)`)
      return [
        logMethod,
        logUrl,
        logStatusCode,
        logResponseTime,
        logDate,
        logUserAgent,
      ].join(' ')
    })
  )
}
