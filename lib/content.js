'use strict'

var envs = process.env

var opts = {
  size: 99999,
  wait: 222
}

module.exports = function (options) {
  var seneca = this

  seneca.add('role:info, type:user', getContentUser)
  seneca.add('info:info, type:info', updateContentUser)

  return {
    name: envs.PORTALEN_CONTENT_TAG || 'portalen-content'
  }
}

function getContentUser (args, done) {
  var seneca = this
  var user = args.user
  var roles = args.roles
  var store = seneca.make('content', 'user')

  seneca.act({cmd: 'collect-info', type: 'user', user: user, roles: roles})

  function respond () {
    store.list$({user: user}, function (error, list) {
      if (error) {
        console.error(error)
        done(null, {})
      } else {
        var data = {
          user: user,
          data: {}
        }

        list.forEach(function (item) {
          data.data[item.type] = item.data
        })

        done(null, data)
      }
    })
  }

  setTimeout(respond, opts.wait)
}

function updateContentUser (msg, done) {
  done(null, {ok: true})

  var seneca = this
  var user = msg.data.user
  var type = msg.data.type
  var store = seneca.make('content', 'user')

  var data = {
    user: user,
    type: type,
    data: msg.data.data
  }

  store.list$({user: user, type: type}, function (error, list) {
    if (error) {
      console.error(error)
    } else {
      if (list.length > 0) {
        // Data exists, let's overwrite it
        data.id = list[0].id
      }

      store.data$(data)

      store.save$(function (error, msg) {
        if (error) {
          console.error(error)
        } else {
          console.log(msg)
        }
      })
    }
  })
}
