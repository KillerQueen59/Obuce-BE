const chalk = require('chalk')
const caller = require('caller')

/**
 * Log pada scheduler yang sedang berjalan
 * @param {object} job scheduler job
 * @param {string} message pesan tambahan untuk di print
 */
exports.schedulerLog = function (job, message = '') {
  console.log(
    [
      chalk.hex('#bf3636')('[scheduler:running]'),
      chalk.hex('#3664bf')(job.attrs.name),
      chalk.hex('#d9ce32')(message),
    ].join(' ')
  )
}

/**
 * Log untuk menampilkan agenda yg sedang berjalan
 * @param {string} action aksi yg sedang dijalankan agenda
 */
exports.agendaLog = function (action) {
  return (job) => {
    console.log(
      [
        chalk.hex('#22ed13')('[scheduler:logging]'),
        chalk.hex('#3664bf')(job.attrs.name),
        chalk.hex('#32cbd9')(action),
        chalk.hex('#3664bf')(`${new Date()}`),
      ].join(' ')
    )
  }
}

/**
 * Fungsi log untuk debugging
 * @param {any} value nilai yg ingin di print
 */
exports.debug = function debug(value) {
  const border = '-'.repeat(64)
  console.log(chalk.hex('#32cbd9')(border))
  console.log(chalk.hex('#FFFF00')(`[log: ${caller()}]`))
  console.log(value)
  console.log(chalk.hex('#32cbd9')(border))
}
