'use strict'

const envs = process.env

var store = {}

var opts = {
  size: 99999,
  wait: 222
}

module.exports = function portalenContent (options) {
  var seneca = this

  seneca.add('role:info, type:user', getContentUser)
  seneca.add('role: info, info: content-collected', updateContentUser)

  return {
    name: envs.PORTALEN_CONTENT_TAG || 'portalen-content'
  }
}

function getContentUser (args, done) {
  const seneca = this
  const user = args.user
  const roles = args.roles

  seneca.act({cmd: 'collect-info', type: 'user', user: user, roles: roles})

  function respond () {
    const result = {
      user: user,
      data: store[user] || []
    }
    done(null, result)
  }

  setTimeout(respond, opts.wait)
}

function updateContentUser (msg, done) {
  done(null, {ok: true})

  const user = msg.data.user
  const type = msg.data.type
  const data = msg.data.data

  if (!store[user]) {
    store[user] = {}
  }

  if (!store[user][type]) {
    store[user][type] = []
  }

  store[user][type] = data
}
