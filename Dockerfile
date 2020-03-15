FROM node:12-alpine

# Copy app directory
COPY ./ /srv/app

# Install app dependencies
WORKDIR /srv/app
RUN npm install

# Ports
EXPOSE 3001

# Launch
CMD [ "node", "server.js" ]
