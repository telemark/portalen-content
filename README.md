# portalen-content
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

```seneca.act({role: 'info', type:'user', user:user, roles:[roles]}, (error, data) => {})```

```curl -d '{"role": "info", "type":"user", "user":"gasg", "roles": ["alle", "administrasjonen"]}' -v http://localhost:8000/act```

### ```role: info, info: content-collected```
Saves content of a given type for a given user

```seneca.act({role: 'info', info: 'content-collected', user:user}, (error, data) => {})```

## Messages emitted

Collects content for a user and/or a user's roles

### ```cmd: collect-info, type: user```

```seneca.act({cmd: 'collect-info', type:'user', user:user, roles:[roles]}, (error, data) => {})```
