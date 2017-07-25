import chalk from 'chalk';
import path from 'path';
import config from '../config';
import fs from 'node-fs-extra';
import chmod from 'chmod';


/*********************************************
 * Create the ./DEPLOY/nodejs/ directory
 *********************************************/
const nodejsDir = path.join(config.deployRoot, 'nodejs');
fs.mkdirSync(nodejsDir);


/*********************************************
 * nodejs
 *********************************************/
// Copy the server files
var sourceServer = config.serverRoot;
var destinationServer = path.join(config.deployRoot, 'nodejs/server');
fs.copy(sourceServer, destinationServer, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Nodejs server files has been copied to the ./DEPLOY/nodejs folder!");
  }
});

// Copy the package.json and remove all the devDependencies
const packageJsonFileIn = path.join(config.appRoot, 'package.json');
const pacpackageJsonFileOut = path.join(config.deployRoot, 'nodejs/package.json');
fs.readFile(packageJsonFileIn, 'utf8', (err, packageJson) => {
  if (err) return console.error(err)

  // Cleanup the devDependencies
  const regexRemoveDevDependencies = /"devDependencies": {([\s\S]*?)},\n /g;
  packageJson = packageJson.replace(regexRemoveDevDependencies, "");

  // Cleanup the scripts list
  const regexRemoveNpmScripts = /"scripts": {([\s\S]*?)},\n /g;
  const prodScripts = `"scripts": {
    "prestart": "npm i",
    "start": "cd /var/nodejs && NODE_ENV=production node_modules/.bin/nodemon server --exec babel-node --presets babel-preset-es2015"
  },
`;
  packageJson = packageJson.replace(regexRemoveNpmScripts, prodScripts);

  // Write changes to index.html file
  fs.writeFile(pacpackageJsonFileOut, packageJson, 'utf8', (err) => {
    if (err) return console.error(err)
    console.log(chalk.blue(`bower tags injected into ${pacpackageJsonFileOut}`));
  });
});

// Copy and update the config.js file to have the proper portAPI value
const configFileName = path.join(config.appRoot, 'config.js');
const nodejsConfigFileName = path.join(config.deployRoot, 'nodejs/config.js');
fs.readFile(configFileName, 'utf8', (err, data) => {
  if (err) return console.error(err)

  // Cleanup the devDependencies
  const updatePortAPI = /portAPI: ([\s\S]*?),/g;
  data = data.replace(updatePortAPI, "portAPI: 8080,");

  // Write changes to DEPLOY/server/nodejs file
  fs.writeFile(nodejsConfigFileName, data, 'utf8', (err) => {
    if (err) return console.error(err)
  });
});

// Make all the remaining
const nodejsBabelRCFileName = path.join(config.deployRoot, 'nodejs/.babelrc');
const nodejsBabelRCContent = `{"presets": ["es2015"]}`;
const nodejsDockerfileFileName = path.join(config.deployRoot, 'nodejs/Dockerfile');
const nodejsDockerfileContent = `FROM node:7.7.1

WORKDIR /var/nodejs
ENV PORT=8080
EXPOSE 8080

COPY server /var/nodejs/server
COPY package.json /var/nodejs/package.json
COPY config.js /var/nodejs/config.js

RUN npm install

CMD ["npm","start"]`;

fs.writeFile(nodejsBabelRCFileName, nodejsBabelRCContent, 'utf8', (err) => {
  if (err) return console.error(err)
});
fs.writeFile(nodejsDockerfileFileName, nodejsDockerfileContent, 'utf8', (err) => {
  if (err) return console.error(err)
});







/*********************************************
 * nginx
 *********************************************/
fs.mkdirSync(path.join(config.deployRoot, 'nginx'));
const deployWWW = path.join(config.deployRoot, 'www');
const nginxWWW = path.join(config.deployRoot, 'nginx/www');
const nginxConfFileName = path.join(config.deployRoot, 'nginx/nginx.conf');
const nginxConfContents = `server {
    listen 80;
    root   /usr/share/nginx/html/;
    index  index.html;

    location /api {
        # make sure that the http://<THIS-MATCHES-SERVICE-NAME-IN-DOCKER-COMPOSE>:8080
        proxy_pass http://nodejs:8080/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # SPA -  all the static files serve as static
    location /assets {
      sendfile on;
    }
    location /code {
      sendfile on;
    }
    location /fonts {
      sendfile on;
    }
    location /react {
      sendfile on;
    }

    # SPA - All other routes let the client router take care of it
    location / {
        try_files $uri /index.html;
    }
}`;
const nginxForeverFileName = path.join(config.deployRoot, 'nginx/nginx-forever.sh');
const nginxForeverContents = `#!/bin/bash
service nginx start
while true; do sleep 1d; done`;
const nginxDockerFileName = path.join(config.deployRoot, 'nginx/Dockerfile');
const nginxDockerContents = `FROM nginx
WORKDIR /
EXPOSE 80
ENV PORT=80

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/backup

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY www /usr/share/nginx/html/
COPY nginx-forever.sh /nginx-forever.sh

# docker-compose need nginx to NOT run as daemon (b/c it will exit)
CMD ["nginx", "-g", "daemon off;"]`;
fs.copy(deployWWW, nginxWWW, err => {
  if (err) return console.error(err)

  fs.writeFile(nginxConfFileName, nginxConfContents, 'utf8', (err) => {
    if (err) return console.error(err)
  });
  fs.writeFile(nginxForeverFileName, nginxForeverContents, 'utf8', (err) => {
    if (err) return console.error(err)
  });
  fs.writeFile(nginxDockerFileName, nginxDockerContents, 'utf8', (err) => {
    if (err) return console.error(err)
  });

  console.log(chalk.green('created nginx stuff'));
});








/*********************************************
 * Docker-Compose Stuff
 *********************************************/
const dockerComposeContents = `version: '2'

services:
  nginx:
    image: appseed-nginx
    container_name: appseed-nginx
    build: ./nginx
    depends_on:
     - "nodejs"
    ports:
     - "80:80"
    # entrypoint: ./wait-for-it.sh web:8080 -- ./nginx-forever.sh
    networks:
      - appseed-network

  nodejs:
    image: appseed-nodejs
    container_name: 'appseed-nodejs'
    build: ./nodejs
    ports:
      - "8080:8080"
    networks:
      - appseed-network

networks:
  appseed-network:
    driver: bridge`;
const dockerComposeFileName = path.join(config.deployRoot, 'docker-compose.yml');
const dockerUpContents = `ENVIRONMENT="production"
projectName="appseed"
composeFileName="docker-compose.yml"

echo "... Building the AppSeed Docker images."
docker-compose -f "$composeFileName" -p "$projectName" build

echo "... Running Docker-Compose."
docker-compose -f "$composeFileName" up`;
const dockerUpFileName = path.join(config.deployRoot, 'up.sh');
const dockerDownContents = `echo "... Stoping all the Docker-Compose containers and removing the custom images."
docker-compose down --rmi all`;
const dockerDownFileName = path.join(config.deployRoot, 'down.sh');
const deployReadMeContents = `# Docker-Compose with bash scripts
- Basic docker-compose commands
  ~~~
  $ ./up.sh
  $ ./down.sh
  ~~~
- Stand-alone static web files can be found in the ./www/
- The rest is for docker if you choose to us it
- Folders structure
  ~~~
  ├── README.md
  ├── docker-compose.yml
  ├── down.sh
  ├── message-running-production.js
  ├── nginx
  │   ├── Dockerfile
  │   ├── nginx-forever.sh
  │   ├── nginx.conf
  │   └── www
          ├── assets
  │       ├── code
  │       ├── fonts
  │       └── index.html
  ├── nodejs
  │   ├── Dockerfile
  │   ├── config.js
  │   ├── package.json
  │   ├── server
  │   │   ├── api.js
  │   │   ├── data
  │   │   ├── db.js
  │   │   ├── index.js
  │   │   └── jwt-auth.js
  │   └── yarn.lock
  ├── up.sh
  └── www
      ├── assets
      ├── code
      ├── fonts
      └── index.html
  ~~~
`;
const deployReadMeFileName = path.join(config.deployRoot, 'README.md');


fs.writeFile(dockerComposeFileName, dockerComposeContents, 'utf8', (err) => {
  if (err) return console.error(err)
});
fs.writeFile(dockerUpFileName, dockerUpContents, 'utf8', (err) => {
  if (err) return console.error(err)
  chmod(dockerUpFileName, 777);
});

fs.writeFile(dockerDownFileName, dockerDownContents, 'utf8', (err) => {
  if (err) return console.error(err)
  chmod(dockerDownFileName, 777);
});

fs.writeFile(deployReadMeFileName, deployReadMeContents, 'utf8', (err) => {
  if (err) return console.error(err)
});














//