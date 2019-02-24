const serve = require('../static')

module.exports = function (fn, Raw) {
    const [vfs, err] = fn(Raw)
    if (err != null) {
        throw err
    }
    return serve(vfs)
}
