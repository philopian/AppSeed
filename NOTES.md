
# A little on nodejs
- *** USE NPM SCRIPTS ***
- we are using NPM-SCRIPTS which allows us to use babel-node which allows us to use import instead of require
- all ./node_modules/.bin are automatically part of the path
- adding pre/post in front of a npm strip will happen pre/post a script
- use yarn to install packages because there are some security check
- use nsp to check the all your packages before running the app
- browser-sync to watch front/back files https://browsersync.io/docs/command-line
- webpack production build via cli ($ webpack --progress -p --config webpack.config.prod.js)


# Module Formats (We do this to avoid global variables)
- ES6 (Airbnb ES6 Styleguide)[https://github.com/airbnb/javascript] ***
- IFFE
- Asynchronous Module Definition (AMD)
- CommonJS
- Universal Module Definition (UMD)

# Why ES6 Modules
- standardize
- statically analyzable
- improved autocomplete
- intelligent refactoring
- warn you of invalid imports
- fail fast
- tree shaking
- reduce code size
- easy to read
- named imports
- default exports

# Why Bundle?? 
- allows us to test our code easier
- only take the portions of the dependencies that we are using
- smaller build code == faster load time
- dev/prod versions 

# Bundlers
- Webpack ***
- Browserify (CommonJS)
- Rollup
- JSPM
- requireJS (AMD)

# HTML bundling
- Manipulating the HTML file via Nodejs ** (if there are packages not found in NPM we can still use bower)
- html-webpack-plugin
- Hard coded scripts


# Browser HTTP (configure all in one files)
- jQuery **
- Axios (fullfeatures node/browser) **
- SuperAgent (fullfeatures node/browser)
- Fetch (standardize, but you have to use a polyfill, promises)
- isomorphic-fetch (both browser/node)
- xhr (subset of node/request)
- Framework-base (angular)
- Browser XMLHttpRequest (old!!!)


# Transpiler (new the lastest and it transpile to ES5)
- Babel ***
- DART
- TypeScript


# Package Manager
- Npm ***
- Bower
- jspm
- jam 
- volo


# Testing
- Mocha/Chai/MochaAwesome ***
- Jasmine
- Jest
- Ava


# e2e
- TestCafe
- webdriver.io
- nightwatch
- selenium



# Linters
- ESLint ** (0 = off, 1 = warn, 2 = error) **




# Automation/Build tools
- Npm Scripts ** (all commands are in the package.json, documented and the industry standard)**
- Gulp (pipes in memory, fast)
- Grunt 
- Brunch
- Broccolijs


# Servers
- Express ***
- Browsersync *** (for development, great for cross-device testing) **
- Hapi (Walmart Labs)
- Koa
- Budo (integrateds with Browserify)
- http-serve (dev only)
- live-server (dev only)


# Sharing Work in progress
- Browser-sync
- Localtunnel (expose localhost via a public URL)
- ngrok (have to signup/install ngrok/install authtoken/start your app ... you can password protect)
- Now (easy way to deploy your app up to the cloud, get a new unique URL, more public)
- Surge (only supports static files)











~~~
  "serve": "npm-run-all --parallel server browser-sync",
    "server": "nodemon server --exec babel-node",
    "browser-sync": "browser-sync start --proxy localhost:8080 --files \"www/css/*.css, www/js/*.js, **/*.html\" --no-notify",
    "s": "concurrently 'npm run server' 'npm run browser-sync' ",
    "ss": "concurrently webpack server browser-sync",
    "sss": "nodemon server --exec babel-node & browser-sync start --proxy 'localhost:8080' --files 'www'",


    type in [debugger;] to fire a debug session in the browser
~~~
