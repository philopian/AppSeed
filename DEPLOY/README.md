# Docker-Compose with bash scripts
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
