<img src="appseedica.png" />


## What is AppSeed?
AppSeed is a starter kit for rapid web application development using nodejs and ES6. It's the environment and some wired up tools. YOU can choose as little or as much 3rd party dependencies (via Bower or NPM or Github) you like.
<br><br>
Happy coding!

<br>


## Prerequisites
- node.js > v6.9.0 (which is Nodejs Long Term Support version)
- bower & yarn ($ npm i -g yarn bower)

<br>


## Technologies
AppSeed is aimed at making your web development experience exceptional, here are a couple of tools it uses:

| **Tech** | **Description** |
|----------|-------|
| [Webpack v2](https://webpack.js.org/) | Bundles npm packages and our JS into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). |
| [Babel](http://babeljs.io) |  Compiles ES6 to ES5, so you can develop using the new version of JavaScript today.     |
| [Bower](https://bower.io/) |  A package manager for the web. You can still use NPM for the frontend packages but try to use Bower whenever you can.     |
| [Redux](http://redux.js.org) | Redux is a predictable state container for JavaScript apps. |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| A bunch of nodejs scripts for automation and building. |
| [ESLint](http://eslint.org/)| Lint your code as you develop and get tool tips on when you are being naughty |
| [SASS](http://sass-lang.com/) | Powerful CSS extension language, allows for variables, functions, and more |
| [PostCSS](https://github.com/postcss/postcss) | Transform styles with JS plugins. Used to autoprefix CSS |
| [VS Code Editor](https://code.visualstudio.com/) | Not manditory but there are some files to help make your development fun. |
| [Express Nodejs Webserver](https://expressjs.com/) | Fast, unopinionated, minimalist web framework for Node.js. It's currently used for a REST API. |
| [Node Security Project](https://www.npmjs.com/package/nsp)| Node Security helps you keep your node applications secure.  |
| [Mochajs](https://mochajs.org/)| Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. We are using [Mocha-Webpack](https://www.npmjs.com/package/mocha-webpack) to bundle our JS code before running test on them. |
| [Istanbul](https://istanbul.js.org/) | JavaScript test coverage made simple. |

<br>


## Commands
Here a couple of npm commands you can use while developing:

| **Command** | **How to run command** |
|----------|-------|
| Download all the application dependencies | $ npm run up |
| Start developing | $ npm start -s |
| Start developing without automatically opening a browser tab | $ npm run app -s |
| Build the distribution version | $ npm run build -s |
| Add a new view | $ npm run new:view -s |
| Run unit tests | $ npm run test:once -s |
| Run unit tests coverage | $ npm run test:cover -s |

<br>

## VS Code
- Setup the Editor formater [⌘ + P], then type in [ > Formatter Config]
- Install the "JS-CSS-HTML" Formatter plugin
~~~
{
  "onSave": true,
  "javascript": {
    "indent_size": 2,
    "indent_char": " ",
    "eol": "auto",
    "preserve_newlines": true,
    "break_chained_methods": false,
    "max_preserve_newlines": 0,
    "space_in_paren": false,
    "space_in_empty_paren": false,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "keep_array_indentation": false,
    "space_before_conditional": true,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "e4x": true,
    "end_with_newline": false,
    "comma_first": false,
    "brace_style": "collapse-preserve-inline"
  },
  "css": {
    "indent_size": 2,
    "indentCharacter": " ",
    "indent_char": " ",
    "selector_separator_newline": true,
    "end_with_newline": false,
    "newline_between_rules": true,
    "eol": "\n"
  },
  "html": {
    "indent_inner_html": false,
    "indent_size": 4,
    "indent_char": " ",
    "indent_character": " "
  }
}
~~~



## React 
- All the react code can be found in the ./react/components/ directory



## React Styled components (styled-components package)
- https://medium.com/@lvarayut/styled-components-in-action-723852f2a93d
- Allows you to have CSS in your component file (don't affect other styles in the page)
- The const variable must start with Uppercase else react will treat it like a regular HTML tag
- Uppercase = style, lowercase == html tag
- You can have dynamic styles based on prop values
- styled-components makes random class name in the HTML


- How to define the css
    ~~~
    const Container = styled.div`
        border: 2px solid rgb(42, 125, 153);
        margin: 20px;
        padding: 10px;
        background-color: rgb(236, 236, 236);
    `;
    ~~~
- how it's used in the render function
    ~~~
      render() {
        return (
            <Container>
              <p>Hello React!</p>
            </Container>
        );
      }
    ~~~
- Want to style an actual component
    ~~~
    const Container = styled('my-web-component')`
        border: 2px solid rgb(42, 125, 153);
        margin: 20px;
        padding: 10px;
        background-color: rgb(236, 236, 236);
    `;
    ~~~





## Stuff to come
- PWA (Progressive Web Applicationify the client)
- vscode setup/configuration
- .vscode debugging the frontend via the ./.vscode/launch.json
- .vscode debugging expressjs server via the ./.vscode/launch.json
- Ansible/docker/nginx
- Template string for deploys webconfig
- Wireup Tests: Unit test notes md
- Wireup Tests: Testcafe UI test
- Wireup Tests: Testcafe screenshots
- Wireup Tests: REST API integration test
- Wireup Tests: Integration test
- Wireup Tests: end-2-end test
- Script: delete views
- Script: add examples
- JWT nodejs
- Nodejs User Manager Panel
- Nodejs Sequelize
- Add sample data in a SQLite database
- Make a tutorial (how to use this)
- Style guide
- Add .net core
- JWT with JOSE .net core
- Yeoman generator simple, kitchen sink, 

