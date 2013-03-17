var spawn = require('child_process').spawn
module.exports = function (opts, cb) {
  if (!cb) {
    cb = opts
    opts = {
      logOutput: true
    }
  }
  var child = spawn('npm', ['rebuild'])
  if (opts && opts.logOutput) {
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stdout)
  }
  child.on('exit', function (code) {
    if (code !== 0) {
      return cb({
        message: 'error rebuilding',
        error: 'bad exit code',
        code: code,
        stack: new Error().stack
      })
    }
    cb()
  })
}
