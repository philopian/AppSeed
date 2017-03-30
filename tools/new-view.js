const readline = require('readline');
const chalk = require('chalk');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const camel = require('camelcase');

function createFiles(viewName) {
  let dashCase = viewName;
  let wordCase = viewName.split("-").join(" ").toLowerCase();
  let camelCase = camel(wordCase);
  let lowerCase = camelCase.toLowerCase();

  //---HTML---------------------------------------
  let html = `<div id="${dashCase}" class="view">
    <h1>Hello, ${wordCase}</h1>
    <button id="just-a-button" class="button success">Click me!</button>
</div>`;
  console.log(path.join(config.webRoot, `html/${dashCase}.html`));

  fs.writeFile(path.join(config.webRoot, `html/${dashCase}.html`), html, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.blue(`Created new file "html/${dashCase}.html" file`));
  });


  //---SASS---------------------------------------
  let sass = `#${dashCase} {
    background-color: rgb(105, 225, 105);
    height: 100%;
    width: 100%;
    h1 {
        color: rgb(0, 139, 139)
    }
}`;
  fs.writeFile(path.join(config.webRoot, `sass/${dashCase}.scss`), sass, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.blue(`Created new file "sass/${dashCase}.scss" file`));
  });




  //---JS---------------------------------------
  let js = `import $ from 'jquery';

require("../sass/${dashCase}.scss");
const html = require("../html/${dashCase}.html");

export class View {
  constructor() {
    console.log('...${camelCase} constructor');
    $(document).on('click', '#just-a-button', this.justaButtonClick)
  }

  deconstructor() {
    $(document).off('click', '#just-a-button', this.justaButtonClick)
  }

  html() {
    return html;
  }

  init() {
    
  }

  //--Custom Method---------
  justaButtonClick() {
    console.log('...JUST A BUTTON CLICK.....from ${dashCase}!!!!');
  }
}
export { View as default };`;
  // Create new file "js/<file-name>.js" file
  fs.writeFile(path.join(config.webRoot, `js/${dashCase}.js`), js, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.blue(`Created new file "js/${dashCase}.js" file`));
  });






  // Read the router file and add new view 
  let importPattern = /let v = {};/g
  let importAddNewContent = `import ${camelCase} from '../${dashCase}';
let v = {};`
  let routerPattern = "===(DON'T DELETE)===========";
  let routerAddNewContent = `===(DON'T DELETE)===========
      case '${lowerCase}':
        v = new ${camelCase}();
        break;`;

  fs.readFile(path.join(config.webRoot, 'js/services/router.js'), 'utf8', (err, jsRouter) => {
    if (err) {
      return console.log(err);
    }

    // Add new view
    jsRouter = jsRouter.replace(importPattern, importAddNewContent);
    jsRouter = jsRouter.replace(routerPattern, routerAddNewContent);

    // Write changes to "js/services/router.js" file
    fs.writeFile(path.join(config.webRoot, 'js/services/router.js'), jsRouter, 'utf8', function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(chalk.blue(`Your new route can be found at: http://localhost:${config.port}/${lowerCase}`));
    });
  });




}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(chalk.blue('What name do you want to name your new view? '), (newViewName) => {
  // Dash case the result
  newViewName = newViewName.split(" ").join("-").toLowerCase();
  createFiles(newViewName);

  console.log(chalk.green(`New view called ${newViewName} was greated:`), newViewName);
  rl.close();
});