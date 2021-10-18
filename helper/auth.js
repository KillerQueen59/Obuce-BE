/**
 * Fungsi bantuan untuk mengambil token
 * @param {object} headers object header dari request
 */
exports.extractToken = (headers) => {
    if (!headers.authorization) throw new RangeError('tidak ada izin')
    return String(headers.authorization).replace(/Bearer /, '')
}