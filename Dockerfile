###########################################################
#
# Dockerfile for portalen-content
#
###########################################################

# Setting the base to nodejs 4.4.4
FROM mhart/alpine-node:4.4.4

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV PORTALEN_CONTENT_TAG portalen-content
ENV PORTALEN_CONTENT_URL http://content.no
ENV PORTALEN_CONTENT_HOST localhost
ENV PORTALEN_CONTENT_PORT 8000

# Startup
CMD ["node", "service.js", "--seneca-log=type:act"]