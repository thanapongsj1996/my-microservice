FROM node:16.13.1

# Create app directory, this is in our container/in our image
WORKDIR /thanapong/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g concurrently
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8001
CMD ["concurrently","npm:start:dev", "npm:listen"]
