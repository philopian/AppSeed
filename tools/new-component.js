const readline = require('readline');
const chalk = require('chalk');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const upperCamelCase = require('uppercamelcase');


const styles = `  const Container = styled.div\`
    height: 260px;
    border: 2px solid rgb(42, 125, 153);
    margin-left: 20px;
    margin-top: 30px;
    padding: 0px 10px;
    background-color: rgb(236, 236, 236);
    display: inline-block;
\`;
const Title = styled.h1\`
    color: rgb(42, 125, 153);
    font-size: 1.5em;
\`;
const ReactImg = styled.img\`
    height: 80px;
    -webkit-animation:spin 14s linear infinite;
    -moz-animation:spin 14s linear infinite;
    animation:spin 14s linear infinite;

    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
\`;`

function createNewReactComponent(inputName) {
  //--Make the component in the ./www/react/components/ directory-----
  let component = `import React from 'react';
  import styled from 'styled-components';
  
  // Styles
  ${styles}
  
  
  // React Component
  export default class ${inputName} extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      // Its more performate to bind your methods in the constructor
      this.myCustomMethod = this.myCustomMethod.bind(this);
  
      // Get store state
      // Subscribe to the store and update state
    }
  
  /*
    // React Methods
    componentWillMount() {
      console.log('componentWillMount');
    }
    componentDidMount() {
      console.log('componentDidMount');
    }
    componentWillReceiveProps() {
      console.log('componentWillReceiveProps');
    }
    shouldComponentUpdate() {
      console.log('shouldComponentUpdate');
      return true;
    }
    componentWillUpdate() {
      console.log('componentWillUpdate');
    }
    componentDidUpdate() {
      console.log('componentDidUpdate');
    }
    componentWillUnmount() {
      console.log('componentWillUnmount');
    }
  */
  
  
    // Custom method
    myCustomMethod() {
      console.log('. you clicked me');
  
      // store.dispatch({
      //   type: 'UPDATE_SOMETHING',
      //   payload: Date(),
      // });
    }
  
    render() {
      return (
        <Container>
          <Title>${inputName}</Title>
          <button className="button" onClick={this.myCustomMethod}>I am a button</button>
        </Container>);
    }
  }`;
  fs.writeFile(path.join(config.webRoot, `react/components/${inputName}.jsx`), component, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.blue(`Your new component can be found at /www/react/components/${inputName}.jsx`));
  });



  //--Add that component to Storybook-----
  fs.readFile(path.join(config.appRoot, 'stories/index.js'), 'utf8', (err, storiesText) => {
    if (err) {
      return console.log(err);
    }

    // Import statement for the new component
    let importStorybookPattern = "===(IMPORTS - DON'T DELETE THIS LINE!!!!)===========";
    let importStorybookAddNewContent = `===(IMPORTS - DON'T DELETE THIS LINE!!!!)===========
import ${inputName} from '../www/react/components/${inputName}.jsx';`;

    // Hook for the new component into storybook
    let hookStorybookPattern = "//===(COMPONENT HOOK - DON'T DELETE THIS LINE!!!!)===========";
    let hookStorybookAddNewContent = `.addDecorator(withKnobs)
    .add('${inputName}',
      withInfo('')(() =>
        <${inputName} />
      )
    )

//===(COMPONENT HOOK - DON'T DELETE THIS LINE!!!!)===========`;

    // Add new view
    storiesText = storiesText.replace(importStorybookPattern, importStorybookAddNewContent);
    storiesText = storiesText.replace(hookStorybookPattern, hookStorybookAddNewContent);

    // Write changes to "stories/index.js" file
    fs.writeFile(path.join(config.appRoot, 'stories/index.js'), storiesText, 'utf8', function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(chalk.blue(`Your new component will also be wired up in storybook!`));
    });
  });
}












//---JS---------------------------------------
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

rl.question(chalk.cyan(`${banner} What name do you want to name your new react component? `), (newComponentName) => {
  // Upper Camelcase the input
  newComponentName = upperCamelCase(newComponentName);
  createNewReactComponent(newComponentName);

  console.log(chalk.green(`New view called ${newComponentName} was greated:`), newComponentName);
  rl.close();
});