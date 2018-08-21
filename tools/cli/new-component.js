// $ npm run appseed:new-component -s
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const _ = require("lodash");

// Ask questions
const cmdPrompt = () => {
  inquirer
    .prompt([
      //
      {
        type: "command",
        name: "componentName",
        message: "Give our component a name!",
        default: "HelloComponent",
        filter: function(val) {
          return {
            input: val,
            titleCase:
              val.indexOf(" ") > -1
                ? _
                    .startCase(_.toLower(val))
                    .split(" ")
                    .join("")
                : _.startCase(val).replace(" ", ""),
            kebabCase: _.kebabCase(val)
          };
        }
      },
      {
        type: "command",
        name: "componentDescription",
        message: "Give our component a short description!",
        default: ""
      }
    ])
    .then(answers => {
      // console.log('[answers]', answers);
      const paths = {
        componentsDir: path.join(
          fs.realpathSync(process.cwd()),
          "www/react/components"
        ),
        newComponentDir: path.join(
          fs.realpathSync(process.cwd()),
          "www/react/components/" + answers.componentName.titleCase
        )
      };

      // Check to see if there is a components folder (./www/react/components/)
      if (fs.existsSync(paths.componentsDir)) {
        //  Check to see if there is a ./www/react/components/<component-name> folder
        if (!fs.existsSync(paths.newComponentDir)) {
          console.log(
            chalk.black.bgBlue("[new component will live here:]"),
            paths.newComponentDir
          );
          // Make the component's dir
          fs.ensureDir(paths.newComponentDir, err => {
            if (err) return console.log(chalk.bgRed(err));

            // Build files
            /*
              StyleComponents.jsx
              index.js
              storybook.js
              styles.js
              test.js
            */
            buildJsx(answers, paths);
            buildIndex(answers, paths);
            buildStyles(answers, paths);
            buildTest(answers, paths);

            if (
              fs.existsSync(path.join(__dirname, "../../.storybook/config.js"))
            ) {
              buildStorybook(answers, paths);
              // Add the story to storybook
              appendStoryToStorybook(
                fs.realpathSync(process.cwd()),
                answers.componentName.titleCase
              );
            }
          });
        } else {
          console.log(
            chalk.bgRed(
              "[Error] It seems like you already have a component with that name"
            )
          );
        }
      } else {
        console.log(
          chalk.bgRed(
            "[Error] There doesn't seem to be a 'components' folder at ./www/react/components/"
          )
        );
      }
    });
};

const makeFile = (filePath, fileContents, fileName) => {
  fs.writeFile(filePath, fileContents, "utf8", err => {
    if (err) return console.log(chalk.bgRed(err));
    // console.log(chalk.bgCyan(`[File created] ${fileName}`));
  });
};

const updateFileContents = (filePath, oldSnippet, newSnippet, message) => {
  return new Promise((resolve, reject) => {
    let fileContents = fs.readFileSync(filePath, "utf8");
    fileContents = fileContents.replace(oldSnippet, newSnippet);
    fs.writeFile(filePath, fileContents, "utf8", err => {
      if (err) return console.log(chalk.bgRed(err));
      // console.log(chalk.bgCyan(`${message}`));
      resolve();
    });
  });
};

const appendStoryToStorybook = (rootDir, componentName) => {
  path.join(rootDir, ".storybook/config.js");

  const filePath = path.join(rootDir, ".storybook/config.js");
  const oldSnippet = new RegExp("} // DONT'T DELETE THIS", "g");
  const newSnippet = `  require("../www/react/components/${componentName}/storybook");
} // DONT'T DELETE THIS`;
  return updateFileContents(
    filePath,
    oldSnippet,
    newSnippet,
    "[story added to storybook]"
  );
};

const buildJsx = (opts, paths) => {
  const filepath = path.join(
    paths.newComponentDir,
    `${opts.componentName.titleCase}.jsx`
  );
  const fileName = `${opts.componentName.titleCase}`;
  const fileContents = `import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./styles.js";

class ${opts.componentName.titleCase} extends Component {
  state = {}
  
  render() {
    return (
      <div className="my-component">
        <Wrapper>
          <h1>${opts.componentName.input}</h1>
          <p>{this.props.message}</p>
        </Wrapper>
      </div>
    );
  }
}
${opts.componentName.titleCase}.propTypes = {
  message: PropTypes.string
};
${opts.componentName.titleCase}.defaultProps = {
  message: "World"
};
export default ${opts.componentName.titleCase};
`;
  makeFile(filepath, fileContents, fileName);
};

const buildIndex = (opts, paths) => {
  const filepath = path.join(paths.newComponentDir, "index.js");
  const fileName = "index.js";
  const fileContents = `import ${opts.componentName.titleCase} from "./${
    opts.componentName.titleCase
  }.jsx";
export default ${opts.componentName.titleCase};`;
  makeFile(filepath, fileContents, fileName);
};

const buildStorybook = (opts, paths) => {
  const filepath = path.join(paths.newComponentDir, "storybook.js");
  const fileName = "storybook.js";
  const fileContents = `import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { setConsoleOptions } from "@storybook/addon-console";

import React from "react";
import Component from "./index.js";

setConsoleOptions({
  panelExclude: [/[HMR]/]
});

const Info = {
  componentSection: "Components",
  title: "${opts.componentName.titleCase}",
  about: "${opts.componentDescription}",
  props: {
    message: "message passed",
    handleClick: action(e => {
      console.log("[handleClick]");
      console.log(e);
    })
  }
};

storiesOf(Info.componentSection, module)
  .addDecorator(withKnobs)
  .add(Info.title, withInfo(Info.about)(() => <Component {...Info.props} />));
`;
  makeFile(filepath, fileContents, fileName);
};

const buildStyles = (opts, paths) => {
  const filepath = path.join(paths.newComponentDir, "styles.js");
  const fileName = "styles.js";
  const fileContents = `import styled from "styled-components";

// Overriding styles
export const Wrapper = styled.div \`
  color: rgb(37, 37, 37);
  button {
    color: #f15c5c;
    background-color: #feee7d;
    margin: 10px;
  }
  p {
    font-size: 20px;
    color: white;
  }
\`;`;
  makeFile(filepath, fileContents, fileName);
};

const buildTest = (opts, paths) => {
  const filepath = path.join(paths.newComponentDir, "test.js");
  const fileName = "test.js";
  const fileContents = `import React from "react";
import Enzyme, { configure, shallow, mount, render } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import Component from "./index.js";

Enzyme.configure({ adapter: new Adapter() });

/**
 * ENZYME DOCS: http://airbnb.io/enzyme/docs/guides/jest.html
 * JEST EXPECT DOCS: https://jestjs.io/docs/en/expect.html
 *
 *
 * https://github.com/facebook/jest/tree/master/examples
 * https://www.youtube.com/watch?v=8Ww2QBVIw0I&feature=youtu.be
 * https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f
 *
 */

// Test the component
describe("${opts.componentName.titleCase}  (Snapshot)", () => {
  it("${opts.componentName.titleCase}  renders without crashing", () => {
    const component = renderer.create(<Component />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

// Test the logic
describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    const actual = 2 + 2;
    const expected = 4;
    expect(actual).toEqual(expected);
  });
});
`;
  makeFile(filepath, fileContents, fileName);
};

///

module.exports = cmdPrompt;
