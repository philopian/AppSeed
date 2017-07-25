FROM node:7.7.1

WORKDIR /var/nodejs
ENV PORT=8080
EXPOSE 8080

COPY server /var/nodejs/server
COPY package.json /var/nodejs/package.json
COPY config.js /var/nodejs/config.js

RUN npm install

CMD ["npm","start"]