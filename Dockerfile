###########################################################
#
# Dockerfile for the-real-laurentius
#
###########################################################

# Setting the base to nodejs 6.9.4
FROM node:6.9.4-alpine

# Maintainer
MAINTAINER Jonas Enge

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

# Startup
ENTRYPOINT node index.js
