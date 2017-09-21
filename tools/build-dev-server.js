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
 * nodejs .env file
 *********************************************/
const dotEnvFile = path.join(nodejsDir, '.env');
const dotEnvContents = `NODE_ENV=production
`;
fs.writeFile(dotEnvFile, dotEnvContents, 'utf8', (err) => {
  if (err) return console.error(err)
  console.log(chalk.blue('....env file created in the nodejs folder'));
});



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
    console.log(chalk.green('Nodejs server files has been copied to the ./DEPLOY/nodejs folder!'));
    console.log(chalk.green('...Copied the nodejs server files has been copied to the ./DEPLOY/nodejs folder'));
  }
});

// Copy the package.json and remove all the devDependencies
const packageJsonFileIn = path.join(config.appRoot, 'package.json');
const packageJsonFileOut = path.join(config.deployRoot, 'nodejs/package.json');
fs.readFile(packageJsonFileIn, 'utf8', (err, packageJson) => {
  if (err) return console.error(err)

  // Cleanup the devDependencies
  const regexRemoveDevDependencies = /"devDependencies": {([\s\S]*?)},\n /g;
  packageJson = packageJson.replace(regexRemoveDevDependencies, "");

  // Cleanup the scripts list
  const regexRemoveNpmScripts = /"scripts": {([\s\S]*?)},\n /g;
  const prodScripts = `"scripts": {
    "prestart": "npm i",
    "start": "cd /var/nodejs && NODE_ENV=production node_modules/.bin/nodemon server"
  },
`;
  packageJson = packageJson.replace(regexRemoveNpmScripts, prodScripts);

  // Write changes to index.html file
  fs.writeFile(packageJsonFileOut, packageJson, 'utf8', (err) => {
    if (err) return console.error(err)
      // console.log(chalk.blue('...Wrote changes to index.html file'));
      // console.log(chalk.blue(`bower tags injected into ${packageJsonFileOut}`));
  });
});

// Copy and update the config.js file to have the proper portAPI value
const configFileName = path.join(config.appRoot, 'config.js');
const nodejsConfigFileName = path.join(config.deployRoot, 'nodejs/config.js');
fs.readFile(configFileName, 'utf8', (err, data) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...'));

  // Cleanup the devDependencies
  const updatePortAPI = /portAPI: ([\s\S]*?),/g;
  data = data.replace(updatePortAPI, "portAPI: 8080,");

  // Write changes to DEPLOY/server/nodejs file
  fs.writeFile(nodejsConfigFileName, data, 'utf8', (err) => {
    if (err) return console.error(err)
      // console.log(chalk.blue('...Copied and updated the config.js file to have the proper portAPI value'));
  });
});

// Create the Dockerfile for nodejs
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
fs.writeFile(nodejsDockerfileFileName, nodejsDockerfileContent, 'utf8', (err) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...Created the Dockerfile for nodejs'));
});

// Make all the remaining
const nodejsBabelRCFileName = path.join(config.deployRoot, 'nodejs/.babelrc');
const nodejsBabelRCContent = `{"presets": ["es2015"]}`;
fs.writeFile(nodejsBabelRCFileName, nodejsBabelRCContent, 'utf8', (err) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...Maded all the remaining nodejs files'));
  console.log(chalk.blue('...Created all the Nodejs files'));
});






/*********************************************
 * nginx
 *********************************************/
// Create the nginx directory in the DEPLOY folder
fs.mkdirSync(path.join(config.deployRoot, 'nginx'));

// Create the nginx.conf file
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
fs.writeFile(nginxConfFileName, nginxConfContents, 'utf8', (err) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...Created the nginx.conf file'));
});

// Create the nginx-forever.sh bash script
const nginxForeverFileName = path.join(config.deployRoot, 'nginx/nginx-forever.sh');
const nginxForeverContents = `#!/bin/bash
service nginx start
while true; do sleep 1d; done`;

fs.writeFile(nginxForeverFileName, nginxForeverContents, 'utf8', (err) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...Created the nginx-forever.sh bash script'));
});

// Create the nginx Dockerfile
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
fs.writeFile(nginxDockerFileName, nginxDockerContents, 'utf8', (err) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...Created the nginx Dockerfile'));
});

// Copy the www folder to the nginx directory
const deployWWW = path.join(config.deployRoot, 'www');
const nginxWWW = path.join(config.deployRoot, 'nginx/www');
fs.copy(deployWWW, nginxWWW, err => {
  if (err) return console.error(err)
    // console.log(chalk.green('...Copied the www folder to the nginx directory'));
  console.log(chalk.blue('...Created nginx scripts'));
});








/*********************************************
 * Docker-Compose Stuff
 *********************************************/
const ansibleDir = path.join(config.deployRoot, 'ansible');
fs.mkdirSync(ansibleDir);

// Create docker-compose.yml file
const dockerComposeFileName = path.join(config.deployRoot, 'docker-compose.yml');
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
fs.writeFile(dockerComposeFileName, dockerComposeContents, 'utf8', (err) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...Created docker-compose.yml file'));
});

// Create up.sh bash script
const dockerUpFileName = path.join(config.deployRoot, 'up.sh');
const dockerUpContents = `ENVIRONMENT="production"
projectName="appseed"
composeFileName="docker-compose.yml"

echo "... Building the AppSeed Docker images."
docker-compose -f "$composeFileName" -p "$projectName" build

echo "... Running Docker-Compose."
docker-compose -f "$composeFileName" up -d`;
fs.writeFile(dockerUpFileName, dockerUpContents, 'utf8', (err) => {
  if (err) return console.error(err)
  chmod(dockerUpFileName, 755);
  // console.log(chalk.blue('...Created up.sh bash script'));
});

// Create down.sh bash script
const dockerDownFileName = path.join(config.deployRoot, 'down.sh');
const dockerDownContents = `echo "... Stoping all the Docker-Compose containers and removing the custom images."
docker-compose down --rmi all`;
fs.writeFile(dockerDownFileName, dockerDownContents, 'utf8', (err) => {
  if (err) return console.error(err)
  chmod(dockerDownFileName, 755);
  // console.log(chalk.blue('...Created down.sh bash script'));
});

// Create the readme.md for the deploy folder
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
fs.writeFile(deployReadMeFileName, deployReadMeContents, 'utf8', (err) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...Created the readme.md for the deploy folder'));
  console.log(chalk.blue('...Created Docker scripts'));
});







/*********************************************
 * Ansible Stuff
 *********************************************/
// Create the ansible.cfg file
const ansibleCfgFileName = path.join(config.deployRoot, 'ansible/ansible.cfg');
const ansibleCfgContents = `[defaults]
hostfile = hosts
deprecation_warnings=False
`;
fs.writeFile(ansibleCfgFileName, ansibleCfgContents, 'utf8', (err) => {
  if (err) return console.error(err)
    // console.log(chalk.blue(''));
});

// Create the host inventory file
const ansibleHostsFileName = path.join(config.deployRoot, 'ansible/hosts');
const ansibleHostsContents = `vmachine-01 ansible_ssh_host=${config.serverIp}

[VMs]
vmachine-01


[VMs:vars]
ansible_ssh_user=root
ansible_ssh_private_key_file=~/.ssh/ansible
`;
fs.writeFile(ansibleHostsFileName, ansibleHostsContents, 'utf8', (err) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...Created Ansible Host'));
});

// Create the init.yml playbook 
const ansibleInitFileName = path.join(config.deployRoot, 'ansible/init.yml');
const ansibleInitContents = `---
################################################################################
- name: Update/Upgrade Linux
  hosts: VMs
  sudo: true
  tasks:
   - name: Updates a server
     apt: update_cache=yes
   - name: Upgrade a server
     apt: upgrade=full
################################################################################

################################################################################
- name: Install fail2ban package
  hosts: VMs
  sudo: true
  tasks:
    - name: Install fail2ban package
      apt: pkg=fail2ban state=present
    - name: Check to see if its running
      shell: /etc/init.d/fail2ban status
      register: fail2ban
    - debug: msg="{{ fail2ban.stdout }}"
################################################################################

################################################################################
- name: Setup UFW
  hosts: VMs
  sudo: true
  tasks:
    - name: Ensure ufw is at the latest version
      apt: pkg=ufw state=latest
      tags: ufw
    - name: Set ufw policy to deny all incoming connections
      ufw: policy=deny direction=incoming
      tags: ufw
    - name: Set ufw policy to allow all outgoing connections
      ufw: policy=allow direction=outgoing
      tags: ufw
    - name: Set ufw to allow ntp
      ufw: rule=allow port=ntp
      tags: ufw
    - name: Set ufw rule to limit connections on ssh/tcp (port 22)
      ufw: rule=limit port=ssh proto=tcp
      tags: ufw
    - name: Set ufw rule to limit connections on www/tcp (port 80)
      ufw: rule=limit port=www proto=tcp
      tags: ufw
    - name: Set ufw rule to limit connections on https/tcp (port 443)
      ufw: rule=limit port=https proto=tcp
      tags: ufw
    - name: Enable ufw logging
      ufw: logging=on
      tags: ufw
    - name: Start ufw
      ufw: state=enabled
      tags: ufw
################################################################################


################################################################################
- name: Install Docker
  hosts: VMs
  sudo: true
  roles:
    - angstwad.docker_ubuntu
  tasks:
    - name: Copy over nginx folder
      copy: src=../nginx/ dest=/var/nginx/ mode=0644
    - name: Copy over nodejs folder
      copy: src=../nodejs/ dest=/var/nodejs/ mode=0644

    - name: Copy over Docker Compose file
      copy: src=../docker-compose.yml dest=/var/docker-compose.yml mode=0644

    - name: Copy over Docker up.sh script file
      copy: src=../up.sh dest=/var/up.sh mode=0755
    - name: Copy over Docker down.sh script file
      copy: src=../down.sh dest=/var/down.sh mode=0755

    - name: Build & Run Docker Compose
      shell: cd /var && ./up.sh
      async: 120
      poll: 0
- name: Stop/Start DockerCompose
  hosts: VMs
  sudo: true
  tasks:
    - name: Give Docker time to build
      shell: echo 'Docker needs a couple minutes to build/run all the containers'
      register: foo
    - debug: msg="{{ foo.stdout }}"
################################################################################`;
fs.writeFile(ansibleInitFileName, ansibleInitContents, 'utf8', (err) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...Created Ansible init script'));
});

// Create the update.yml playbook 
const ansibleUpdateFileName = path.join(config.deployRoot, 'ansible/update.yml');
const ansibleUpdateContents = `---
################################################################################
- name: Update web static files for nginx
  hosts: VMs
  sudo: true
  tasks:
    - name: Sync nginx files (including the static web files)
      synchronize:
        src: ../nginx/
        dest: /var/nginx/

- name: Update the nodejs server files
  hosts: VMs
  sudo: true
  tasks:
    - name: Sync nodejs files (including the static web files)
      synchronize:
        src: ../nodejs/
        dest: /var/nodejs/
        rsync_opts:
          - "--exclude=node_modules"

- name: Stop/Start DockerCompose
  hosts: VMs
  sudo: true
  tasks:
    - name: Teardown docker
      shell: cd /var && ./down.sh      
    - name: Build docker
      shell: cd /var && ./up.sh
      async: 120
      poll: 0
- name: Stop/Start DockerCompose
  hosts: VMs
  sudo: true
  tasks:
    - name: Give Docker time to build
      shell: echo 'Docker needs a couple minutes to build/run all the containers'
      register: foo
    - debug: msg="{{ foo.stdout }}"
################################################################################`;
fs.writeFile(ansibleUpdateFileName, ansibleUpdateContents, 'utf8', (err) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...Create Ansible update script'));
  console.log(chalk.blue('...Created Ansible scripts'));
});
















//