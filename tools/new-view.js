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


  //---TEST FILE---------------------------------------
  let mocha = `import { expect } from 'chai';

describe('./www/${dashCase}.js', () => {
  it('... true should == true', () => {
    expect(true).to.equal(true);
  });
});`;
  console.log(path.join(config.webRoot, `../tests/www/${dashCase}.test.js`));

  fs.writeFile(path.join(config.webRoot, `../tests/www/${dashCase}.test.js`), mocha, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.blue(`Created new file "./tests/www/${dashCase}.test.js" file`));
  });


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
    console.log(chalk.blue(`Created new file "./www/html/${dashCase}.html" file`));
  });


  //---SASS---------------------------------------
  let sass = `@import 'globals';
  #${dashCase} {
    background-color: $color-white;
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
    console.log(chalk.blue(`Created new file "./www/sass/${dashCase}.scss" file`));
  });




  //---JS---------------------------------------
  let js = `import $ from 'jquery';

require('../sass/${dashCase}.scss');
const html = require('../html/${dashCase}.html');

export class View {
  constructor() {
    // Add your class properties here
    this.someProperty = "This is a class property!";

    console.log('...${camelCase} constructor');
  }

  addListeners() {
    // Add event listerners to your DOM elements here
    $('#just-a-button').on("click", this.justaButtonClick.bind(this));
  }

  deconstructor() {
    // Remove the event listeners here so that it doesn't get fired on other views
    $('#just-a-button').unbind('click');
  }

  html() {
    return html;
  }

  init() {
    // Everything should be in the DOM now so the document should be ready
  }

  //--Custom Method---------
  justaButtonClick(e) {
    this.printMessage(\`..the (\${$(e.target).text()}) button was clicked \`);
  }

  printMessage(message) {
    console.log(\`\${message} ... from ${dashCase}\`);
  }

}
export { View as default };`;
  // Create new file "js/<file-name>.js" file
  fs.writeFile(path.join(config.webRoot, `js/${dashCase}.js`), js, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.blue(`Created new file "./www/js/${dashCase}.js" file`));
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

const banner = `
   ÛÛÛÛÛÛÛÛÛ                       ÛÛÛÛÛÛÛÛÛ                      ÛÛÛÛÛ
  ÛÛÛ°°°°°ÛÛÛ                     ÛÛÛ°°°°°ÛÛÛ                    °°ÛÛÛ 
 °ÛÛÛ    °ÛÛÛ ÛÛÛÛÛÛÛÛ  ÛÛÛÛÛÛÛÛ °ÛÛÛ    °°°   ÛÛÛÛÛÛ  ÛÛÛÛÛÛ  ÛÛÛÛÛÛÛ 
 °ÛÛÛÛÛÛÛÛÛÛÛ°°ÛÛÛ°°ÛÛÛ°°ÛÛÛ°°ÛÛÛ°°ÛÛÛÛÛÛÛÛÛ  ÛÛÛ°°ÛÛÛÛÛÛ°°ÛÛÛÛÛÛ°°ÛÛÛ 
 °ÛÛÛ°°°°°ÛÛÛ °ÛÛÛ °ÛÛÛ °ÛÛÛ °ÛÛÛ °°°°°°°°ÛÛÛ°ÛÛÛÛÛÛÛ°ÛÛÛÛÛÛÛ°ÛÛÛ °ÛÛÛ 
 °ÛÛÛ    °ÛÛÛ °ÛÛÛ °ÛÛÛ °ÛÛÛ °ÛÛÛ ÛÛÛ    °ÛÛÛ°ÛÛÛ°°° °ÛÛÛ°°° °ÛÛÛ °ÛÛÛ 
 ÛÛÛÛÛ   ÛÛÛÛÛ°ÛÛÛÛÛÛÛ  °ÛÛÛÛÛÛÛ °°ÛÛÛÛÛÛÛÛÛ °°ÛÛÛÛÛÛ°°ÛÛÛÛÛÛ°°ÛÛÛÛÛÛÛÛ
°°°°°   °°°°° °ÛÛÛ°°°   °ÛÛÛ°°°   °°°°°°°°°   °°°°°°  °°°°°°  °°°°°°°° 
              °ÛÛÛ      °ÛÛÛ                                           
              ÛÛÛÛÛ     ÛÛÛÛÛ                                          
             °°°°°     °°°°°                                           


`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(chalk.blue(`${banner} What name do you want to name your new view? `), (newViewName) => {
  // Dash case the result
  newViewName = newViewName.split(" ").join("-").toLowerCase();
  createFiles(newViewName);

  console.log(chalk.green(`New view called ${newViewName} was greated:`), newViewName);
  rl.close();
});