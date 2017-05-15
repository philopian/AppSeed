# AppSeed ES6

## Prerequisites
- node.js > 4x
- bower & yarn ($ npm i -g yarn bower)


## What's in it?
- Bower for frontend dependencies
- NPM for dev and prod dependencies
- Expressjs for the server
- ES6 Modules
- Webpack version 2
- Bable (Transpiling)
- ESLint
- nsp (node security project)
- Simple frontend router
- Command to create new view [$ npm run new:view -s]
- Redux
- Testing with Mocha & Webpack
- Code coverage with Istanbul



## Download Packages
~~~
  $ npm run up
~~~

## Start Developing
~~~
  $ npm start -s
~~~


## Build Distribution
~~~
  $ npm run build -s
~~~

## Deployment
- Azure (dist with all the static content and a web config file)
- Digital Ocean (docker-compose/ ansible)
- Heroku