'use strict'

const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const Content = require('./lib/content')
const envs = process.env

const options = {
  seneca: {
    log: 'silent',
    tag: envs.PORTALEN_CONTENT_TAG || 'portalen-content'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'role: info, type: user', model: 'consume'},
      {pin: 'role: info, info: content-collected', model: 'observe'}
    ]
  },
  content: {
    url: envs.PORTALEN_CONTENT_URL || 'http://content.no'
  },
  isolated: {
    host: envs.PORTALEN_CONTENT_HOST || 'localhost',
    port: envs.PORTALEN_CONTENT_PORT || '8000'
  }
}
const Service = Seneca(options.seneca)

if (envs.PORTALEN_CONTENT_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Content, options.content)
