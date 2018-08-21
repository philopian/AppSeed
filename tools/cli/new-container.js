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
        message: "Give our container-component a name!",
        default: "HelloContainer",
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
        message: "Give our container-component a short description!",
        default: ""
      }
    ])
    .then(answers => {
      // console.log('[answers]', answers);
      const paths = {
        componentsDir: path.join(
          fs.realpathSync(process.cwd()),
          "www/react/containers"
        ),
        newComponentDir: path.join(
          fs.realpathSync(process.cwd()),
          "www/react/containers/" + answers.componentName.titleCase
        )
      };

      // Check to see if there is a components folder (./www/react/components/)
      if (fs.existsSync(paths.componentsDir)) {
        //  Check to see if there is a ./www/react/components/<component-name> folder
        if (!fs.existsSync(paths.newComponentDir)) {
          console.log(
            "[new container-component will live here:]",
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
            buildStorybook(answers, paths);
            buildStyles(answers, paths);
            buildTest(answers, paths);

            // Add the story to storybook
            appendStoryToStorybook(
              fs.realpathSync(process.cwd()),
              answers.componentName.titleCase
            );
          });
        } else {
          console.log(
            chalk.bgRed(
              "[Error] It seems like you already have a container-component with that name"
            )
          );
        }
      } else {
        console.log(paths.componentsDir);

        console.log(
          chalk.bgRed(
            "[Error] There doesn't seem to be a 'containers' folder at ./www/react/containers/"
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
  const newSnippet = `  require("../www/react/containers/${componentName}/storybook");
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
import { connect } from "react-redux";
import { Wrapper } from "./styles.js";

// import { exampleMethod } from "../../actions/some-reducer";

export class ${opts.componentName.titleCase} extends Component {
  state = {
    yy: ""
  };

  render() {
    return (
      <Wrapper>
        <h1>Hello containter!</h1>
        <p>Container components connect to the redux store for props</p>
      </Wrapper>
    );
  }
}

${opts.componentName.titleCase}.propTypes = {
  // exampleProp: PropTypes.string.isRequired,
  // exampleMethod: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  // exampleProp: state.exampleProp,
});
const mapDispatchToProps = dispatch => ({
  // exampleMethod: () => dispatch(exampleMethod())
});
export default connect(mapStateToProps, mapDispatchToProps)(${
    opts.componentName.titleCase
  });
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
import { ${opts.componentName.titleCase} as Component } from "./${
    opts.componentName.titleCase
  }.jsx";

setConsoleOptions({
  panelExclude: [/[HMR]/]
});

const Info = {
  componentSection: "Container",
  title: "${opts.componentName.titleCase}",
  about: "this is a simple example container",
  mockProps: {
    // exampleProp: "a little sample data for you",
    // exampleMethod: () => action("exampleMethod")
  }
};

storiesOf(Info.componentSection, module)
  .addDecorator(withKnobs)
  .add(
    Info.title,
    withInfo(Info.about)(() => <Component {...Info.mockProps} />)
  );
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
import { ${opts.componentName.titleCase} as Component } from "./${
    opts.componentName.titleCase
  }.jsx";

Enzyme.configure({ adapter: new Adapter() });

const mockLoginfn = jest.fn();
const props = {
  exampleProp: "......",
  exampleMethod: mockLoginfn
};

describe("${opts.componentName.titleCase} (Snapshot)", () => {
  it("${opts.componentName.titleCase} renders without crashing", () => {
    const mockLoginfn = jest.fn();
    const component = renderer.create(<Component {...props} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe("Component", () => {
  let component;
  const mockLoginfn = jest.fn();
  beforeEach(() => {
    component = shallow(<Component {...props} />);
  });

  // ...tests here...
});

// Logic
describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    expect(2 + 2).toBe(4);
  });
});
`;
  makeFile(filepath, fileContents, fileName);
};

///

module.exports = cmdPrompt;
