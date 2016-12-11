'use strict'

var Seneca = require('seneca')
var Mesh = require('seneca-mesh')
var Content = require('./lib/content')
var envs = process.env

var options = {
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
  mongodb: {
    uri: envs.PORTALEN_CONTENT_MONGODB_URI || 'mongodb://localhost:27017/content'
  },
  content: {
    url: envs.PORTALEN_CONTENT_URL || 'http://content.no'
  },
  isolated: {
    host: envs.PORTALEN_CONTENT_HOST || 'localhost',
    port: envs.PORTALEN_CONTENT_PORT || '8000'
  }
}
var Service = Seneca(options.seneca)

if (envs.PORTALEN_CONTENT_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Content, options.content)
