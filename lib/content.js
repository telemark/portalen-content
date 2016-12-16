'use strict'

const Loki = require('lokijs')
const envs = process.env
const logTime = require('./log-time')
const tag = envs.PORTALEN_CONTENT_TAG || 'portalen-content'

const db = new Loki('../db/content.json')
const content = db.addCollection('content')

module.exports = function portalenContent (options) {
  const seneca = this

  seneca.add('role: info, type: user', getContentUser)
  seneca.add('role: info, info: content-collected', updateContentUser)

  return tag
}

function repackStore (data) {
  var repack = {}
  const dropKeys = (item) => ['user', 'meta', '$loki'].indexOf(item) === -1
  if (data) {
    Object.keys(data).filter(dropKeys).forEach((dataKey) => {
      repack[dataKey] = data[dataKey]
    })
  }

  return repack
}

function getContentUser (args, done) {
  const seneca = this
  const user = args.user
  const roles = args.roles
  const pattern = args.meta$.pattern

  console.log(`${tag} - ${logTime()} - ${pattern}: collects content - ${user}`)

  const result = {
    user: user,
    data: repackStore(content.findOne({user: user}))
  }

  console.log(`${tag} - ${logTime()} - ${pattern}: returns content - ${user} - found ${Object.keys(result.data).length}`)

  done(null, result)

  seneca.act({cmd: 'collect-info', type: 'user', user: user, roles: roles})
}

function updateContentUser (msg, done) {
  done(null, {ok: true})

  const user = msg.data.user
  const type = msg.data.type
  const data = msg.data.data
  const pattern = msg.meta$.pattern

  const userContent = content.findOne({user: user})

  if (!userContent) {
    var payload = {
      user: user
    }
    payload[type] = data
    content.insert(payload)
  } else {
    userContent[type] = data
    content.update(userContent)
  }

  console.log(`${tag} - ${logTime()} - ${pattern}: stored content - ${user} - ${type}`)
}
