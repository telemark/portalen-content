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

### PORTALEN_CONTENT_MONGODB_NAME
Name for MongoDB database. Defaults to 'content'

### PORTALEN_CONTENT_MONGODB_HOST
HOST for MongoDB. Defaults to ```localhost```

### PORTALEN_CONTENT_MONGODB_PORT
PORT for MongoDB. Defaults to ```27017```

## Messages handled

### ```role:info, type:user```

Returns saved content for a user and/or a user's roles

```seneca.act({role: 'info', type:'user', user:user, roles:[roles]}, (error, data) => {})```

```curl -d '{"role": "info", "type":"user", "user":"gasg", "roles": ["alle", "administrasjonen"]}' -v http://localhost:8000/act```

### ```info:info, type:info```
Saves content of a given type for a given user

```seneca.act({info: 'info', type:'info', user:user}, (error, data) => {})```

## Messages emitted

Collects content for a user and/or a user's roles

### ```cmd: collect-info, type: user```

```seneca.act({cmd: 'collect-info', type:'user', user:user, roles:[roles]}, (error, data) => {})```
