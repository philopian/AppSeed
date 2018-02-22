![Appseedica](/appseedica.png)

## What is AppSeed?
AppSeed is a starter kit for rapid web application development using nodejs and ES6. This template is wired up with react in mind but you can remove it and just work with ES6 classes. It's the environment and some wired up tools. YOU can choose as little or as much 3rd party dependencies (via Bower or NPM or Github) you like.
<br><br>
Happy coding!

<br>


## Prerequisites
- Node.js > v8.9.1 (which is Nodejs Long Term Support version, older version should work but you gotta move forward!!)
- Bower & Yarn ($ npm i -g yarn bower)
- (Optional) Docker (for testing the DEPLOY folder & running those containers on a server)
- (Optional) Anisble (if you want to auto deploy to your server)

<br>




## Commands
Here a couple of npm commands you can use while developing:

| **Command** | **How to run command** |
|----------|-------|
| Start developing | $ npm start -s |
| Only run tests | $ npm test -s |
| Only run Storybook | $ npm run storybook -s |
| Run all (dev/test/storybook) | $ npm run start:all -s |
| Build your application | $ npm run build -s |



<br>



## Technologies
AppSeed is aimed at making your web development experience exceptional, here are a couple of tools it uses:

| **Tech** | **Description** |
|----------|-------|
| [VS Code Editor](https://code.visualstudio.com/) | Not manditory but there are some files to help make your development fun. There are some workspace settings that can be found in the ./vscode/settings.json and some settings for debugging in the ./vscode/launch.json. |
| [Webpack](https://webpack.js.org/) | Web bundler for your development pleasure. |
| [Babel](http://babeljs.io) |  Compiles ES6 to ES5, so you can develop using the new version of JavaScript today.     |
| [Bower](https://bower.io/) |  A package manager for the web. You can still use NPM for the frontend packages but try to use Bower whenever you can.     |
| [Redux](http://redux.js.org) | Redux is a predictable state container for JavaScript apps. |
| [ESLint](http://eslint.org/)| Lint your code as you develop and get tool tips on when you are being naughty |
| [SASS](http://sass-lang.com/) | Powerful CSS extension language, allows for variables, functions, and more |
| [PostCSS](https://github.com/postcss/postcss) | Transform styles with JS plugins. Used to autoprefix CSS |
| [Expressjs](https://expressjs.com/) | Fast, unopinionated, minimalist werbserver framework for Node.js. It's currently used for a REST API. |
| [Node Security Project](https://www.npmjs.com/package/nsp)| Node Security helps you keep your node applications secure.  |
| [Jest](https://facebook.github.io/jest/) | JavaScript test framework made simple. |
| [Istanbul](https://istanbul.js.org/) | JavaScript test framework. |
| [Docker](https://www.docker.com/) | Have containers for testing locally and using those containers on the server. |
| [Ansible](https://www.ansible.com/) | Deployment automation to your server. |
| [Storybook](https://storybook.js.org/) | Great way to develop your react components in isolation before you add them to you website. |
<br>
