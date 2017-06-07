# AppSeed
~~~
    ___               _____               __
   /   |  ____  ____ / ___/___  ___  ____/ /
  / /| | / __ \/ __ \\__ \/ _ \/ _ \/ __  / 
 / ___ |/ /_/ / /_/ /__/ /  __/  __/ /_/ /  
/_/  |_/ .___/ .___/____/\___/\___/\__,_/   
      /_/   /_/    
~~~   

## Prerequisites
- node.js > 4x
- bower & yarn ($ npm i -g yarn bower)


## What's in it?
- Webpack version 2
- Bable (Transpiling)
- Bower for frontend dependencies
- NPM for frontend/backend dependencies
- Expressjs for REST API
- Simple frontend view router
- ES6 Modules
- ESLint
- nsp (node security project)
- Command to create new view [$ npm run new:view -s]
- Simple Router
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

## Creating a new view
~~~
  $ npm run new:view -s
~~~


## Deployment
- Azure (dist with all the static content and a web config file)
- Digital Ocean (docker-compose/ ansible)
- Heroku