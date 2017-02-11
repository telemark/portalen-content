[![Build Status](https://travis-ci.org/telemark/portalen-content.svg?branch=master)](https://travis-ci.org/telemark/portalen-content)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# portalen-content

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/portalen-content.svg)](https://greenkeeper.io/)
Collects content for portalen

## Configuration

### PORTALEN_CONTENT_TAG
Tag for the service. Defaults to ```portalen-content```

### PORTALEN_CONTENT_ISOLATED
Use this to run the service in isolation and not connect to the mesh network

### PORTALEN_CONTENT_HOST
Host if the service runs in isolated mode. Defaults to ```localhost```

### PORTALEN_CONTENT_PORT
Port number if the service runs in isolated mode. Defaults to ```8000```

## Messages handled

### ```role:info, type:user```

Returns saved content for a user and/or a user's roles

```JavaScript
seneca.act({role: 'info', type:'user', user:user, roles:[roles]}, (error, data) => {})
```

```bash
$ curl -d '{"role": "info", "type":"user", "user":"gasg", "roles": ["alle", "administrasjonen"]}' -v http://localhost:8000/act
```

### ```role: info, info: content-collected```
Saves content of a given type for a given user

```JavaScript
seneca.act({role: 'info', info: 'content-collected', user:user}, (error, data) => {})
```

```bash
$ curl -d '{"role":"info", "info":"content-collected", "data":{"user": "gasg", "type": "ad", "data": ["cool"]}}' -v http://localhost:8000/act
```


## Messages emitted

Collects content for a user and/or a user's roles

### ```cmd: collect-info, type: user```

```JavaScript
seneca.act({cmd: 'collect-info', type:'user', user:user, roles:[roles]}, (error, data) => {})
```

## License
[MIT](LICENSE)