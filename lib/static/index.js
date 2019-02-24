const {
    resolve
} = require('path')
const assert = require('assert')
const send = require('../send')

module.exports = function serve(fs, root = '/', opts = {}) {
    assert(fs, 'fs required')

    // options
    opts.root = resolve(root)
    if (opts.index !== false) opts.index = opts.index || 'index.html'

    if (!opts.defer) {
        return async function (ctx, next) {
            let done = false

            if (ctx.method === 'HEAD' || ctx.method === 'GET') {
                try {
                    done = await send(ctx, {
                        fs,
                        path: ctx.path,
                    }, opts)
                } catch (err) {
                    if (err.status !== 404) {
                        throw err
                    }
                }
            }

            if (!done) {
                await next()
            }
        }
    }

    return async function (ctx, next) {
        await next()

        if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return
        // response is already handled
        if (ctx.body != null || ctx.status !== 404) return // eslint-disable-line

        try {
            await send(ctx, {
                fs,
                path: ctx.path,
            }, opts)
        } catch (err) {
            if (err.status !== 404) {
                throw err
            }
        }
    }
}