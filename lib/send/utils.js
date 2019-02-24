const {
  basename,
  extname,
  sep,
} = require('path')

/**
 * Check if it's hidden.
 */

function isHidden(root, path) {
  path = path.substr(root.length).split(sep)
  for (let i = 0; i < path.length; i++) {
    if (path[i][0] === '.') return true
  }
  return false
}

/**
 * File type.
 */

function type(file, ext) {
  return ext !== '' ? extname(basename(file, ext)) : extname(file)
}

/**
 * Decode `path`.
 */

function decode(path) {
  try {
    return decodeURIComponent(path)
  } catch (err) {
    return -1
  }
}

/**
 * Stream to String
 */

function getContent(r) {
  return new Promise((resolve, reject) => {
    let cache = ''
    r.on('error', reject)
    r.on('data', (data) => cache += data)
    r.on('end', () => resolve(cache))
  })
}

module.exports = {
  isHidden,
  type,
  decode,
  getContent,
}