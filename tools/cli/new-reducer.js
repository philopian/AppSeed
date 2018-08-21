// $ npm run appseed:new-component -s
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const _ = require("lodash");

let actionCreator = "";
// Ask questions
const cmdPrompt = () => {
  inquirer
    .prompt([
      //
      {
        type: "command",
        name: "reducerName",
        message: "Give our reducer a name!",
        default: "simpleReducer",
        filter: function(val) {
          actionCreator = _.camelCase(val);
          return {
            input: val,
            titleCase:
              val.indexOf(" ") > -1
                ? _.startCase(_.toLower(val))
                    .split(" ")
                    .join("")
                : val,
            camelCase: _.camelCase(val),
            kebabCase: _.kebabCase(val),
            upperCase: _.upperCase(val)
              .split(" ")
              .join("_")
          };
        }
      },
      {
        type: "command",
        name: "actionType",
        message: "Type in a action type constant",
        default: "SOME_ACTION",
        filter: val => {
          return _.upperCase(val)
            .split(" ")
            .join("_");
        }
      },
      {
        type: "command",
        name: "actionCreator",
        message: "Type in a action type creator",
        default: "someActionToPerform",
        filter: val => {
          return _.camelCase(val);
        }
      },
      {
        type: "list",
        name: "initialValue",
        message: "What is the initial data type?",
        choices: ["String", "Number", "Array", "Object"],
        filter: val => {
          switch (val) {
            case "String":
              return '""';
              break;
            case "Number":
              return 0;
              break;
            case "Array":
              return "[]";
              break;
            case "Object":
              return "{}";
              break;
          }

          return str.toLowerCase();
        }
      }
    ])
    .then(answers => {
      const paths = {
        actionFile: path.join(
          fs.realpathSync(process.cwd()),
          "www/react/actions/" + answers.reducerName.kebabCase + ".js"
        ),
        actionTypesFile: path.join(
          fs.realpathSync(process.cwd()),
          "www/react/actions/types.js"
        ),
        reducerFolder: path.join(
          fs.realpathSync(process.cwd()),
          "www/react/reducers",
          answers.reducerName.kebabCase
        ),
        reducerIndexFile: path.join(
          fs.realpathSync(process.cwd()),
          "www/react/reducers",
          answers.reducerName.kebabCase,
          "index.js"
        ),
        reducersFile: path.join(
          fs.realpathSync(process.cwd()),
          "www/react/reducers/index.js"
        )
      };

      // Check to see if there is a components folder (./www/react/components/)
      if (!fs.existsSync(paths.actionFile)) {
        if (!fs.existsSync(paths.reducerFolder)) {
          // Make the component's dir
          fs.ensureDir(paths.reducerFolder, err => {
            if (err) return console.log(chalk.bgRed(err));
            // Build files
            buildActions(answers, paths);
            buildReducerIndex(answers, paths);
            appendActionTypes(answers, paths);
            appendToCombineReducers(answers, paths);
          });
        } else {
          console.log(
            chalk.bgRed(
              "[Error] It seems like you already have a reducer with that name"
            )
          );
        }
      } else {
        console.log(
          chalk.bgRed(
            "[Error] It seems like you already have a action file with that name"
          )
        );
      }
    });
};

///////////

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

const appendTextToFile = (filePath, fileContents, fileName) => {
  fs.appendFile(filePath, fileContents, err => {
    if (err) throw err;
    // console.log("[appended] " + fileName);
  });
};

const buildActions = (opts, paths) => {
  const filepath = path.join(paths.actionFile);
  const fileContents = `import { ${opts.actionType} } from "./types";

export const ${opts.actionCreator} = newData => {
  return dispatch => {
    dispatch({
      type: ${opts.actionType},
      payload: newData
    });
  };
};`;
  makeFile(filepath, fileContents, "./actions/<>.js");
};

const buildReducerIndex = (opts, paths) => {
  const filepath = path.join(paths.reducerIndexFile);
  const fileContents = `import { ${
    opts.actionType
  } } from "../../actions/types";

export default (state = ${opts.initialValue}, action) => {
  switch (action.type) {
    case ${opts.actionType}:
      return action.payload;
    default:
      return state;
  }
};`;
  makeFile(filepath, fileContents, "reducer/<>/index.js");
};

const appendActionTypes = (opts, paths) => {
  const filepath = path.join(paths.actionTypesFile);
  const fileContents = `
  
/**
* ${opts.reducerName.input}
*/
export const ${opts.actionType} = "${opts.actionType}";`;

  // console.log("\n\n\n\n", filepath);

  appendTextToFile(filepath, fileContents, "reducer/<>/index.js");
};

const appendToCombineReducers = (opts, paths) => {
  const filepath = path.join(paths.reducersFile);
  // const oldSnippet = /export default combineReducers\({/;
  const oldSnippet = "export default combineReducers({";
  const newSnippet = `import ${opts.reducerName.camelCase} from "./${
    opts.reducerName.kebabCase
  }";
export default combineReducers({
  ${opts.reducerName.camelCase},`;

  return updateFileContents(
    filepath,
    oldSnippet,
    newSnippet,
    "reducer/<>/index.js"
  );
};

module.exports = cmdPrompt;
