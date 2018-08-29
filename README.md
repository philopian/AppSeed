![Appseedica](/appseedica.gif)

# AppSeed StarterKit

- Dev/Test/Build web application with live-reloading on file save
- Scafold additional react/redux features
- _For the older version take a look at the "VERSION_1" branch_

## Start Developing

- Get started developing

  ```
    $ npm start -s
  or
    $ yarn start
  ```

## Develop components in isolation with Storybook

- Get started developing

  ```
    $ npm run storybook -s
  or
    $ yarn storybook
  ```

## Test with Jest

- Test your components with Jest
  ```text
    $ npm test -s
  or
    $ yarn test
  ```
- Create code coverage

  ```text
    $ npm run coverage -s
    or
    $ yarn coverage
  ```

## Server logging

- There a logger file (./server/tools/logger.js)
- If you want to add some logs import the file and fire off a
  ```js
  logger.log({
    level: "info",
    message: "Hello distributed log files!"
  });
  ```
- The logs will be written in the ./server/\_\_LOGS\_\_/appseed-server.log file
- [click here for more info](https://github.com/winstonjs/winston)

## Debug with VSCode + Chrome

- Click the Debugger icon in the left panel > choose the "[Frontend debug] Launch Chrome" option

## Build for deployment

- Build your application for deployment
  ```
    $ npm run build -s
  or
    $ yarn build
  ```
- Since we are defining the NODE_ENV in Azure we don't have to append a node environment on the server
- If you want to run this locally make sure you run
  ```
    $ cd DEPLOY
    $ NODE_ENV=production npm start
  or
    $ cd DEPLOY
    $ NODE_ENV=production yarn start
  ```

## Simple CLI to add scafold new features

- Quick way to scafold new react components/containers/reducers

  ```
    $ npm run new component
    $ npm run new container
    $ npm run new reducer
  or
    $ yarn new component
    $ yarn new container
    $ yarn new reducer
  ```

# Additional info

- Didn't want to bundle this up cause people might have their own preferences

  ```text
    $ npm i -g  eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import
  ```

- If you are using VSCode there are some files that are hidden so that the folder structure looks a little cleaner, if you want to show all or some open up the .vscode/settings.json and take a look under the "files.exclude"

- There is a bower.json file for some dependencies that can't be found on npm
