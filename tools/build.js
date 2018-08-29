const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const copydir = require("copy-dir");

const config = require("../appseed.config");
const printMessage = require("./print-message");
const templates = require("./templates");

/**
 * Variables
 *
 */
const APP_DIR = config.appRoot;
const PROD_DIR = config.deployRoot;
const WWW_DEV_PATH = config.webRoot;
const WWW_PROD_PATH = path.join(config.deployRoot, "www");
const SERVER_DEV_PATH = path.join(config.appRoot, "server");
const SERVER_PROD_PATH = path.join(config.deployRoot, "server");

/**
 * Define functions
 *
 */

// "./www/assets" folder
const copyAssets = () => {
  const fromAssetsFolder = path.join(WWW_DEV_PATH, "assets");
  const toAssetsFolder = path.join(WWW_PROD_PATH, "assets");
  if (fs.existsSync(fromAssetsFolder)) {
    fs.mkdirSync(toAssetsFolder);
    copydir.sync(fromAssetsFolder, toAssetsFolder);
    printMessage("copied", "assets folder to the prod folder");
  }
};

// "./www/data" folder
const copyDataFolder = () => {
  const fromFolder = path.join(WWW_DEV_PATH, "data");
  const toFolder = path.join(WWW_PROD_PATH, "data");
  if (fs.existsSync(fromFolder)) {
    fs.mkdirSync(toFolder);
    copydir.sync(fromFolder, toFolder);
    printMessage("copied", "data folder to the prod folder");
  }
};

// "./www/favicon"
const copyFavicon = () => {
  const fromFavPath = path.join(WWW_DEV_PATH, "favicon.ico");
  if (fs.existsSync(fromFavPath)) {
    const favFrom = fs.createReadStream(fromFavPath, {
      flags: "r",
      encoding: "binary"
    });
    const toFavPath = path.join(WWW_PROD_PATH, "favicon.ico");
    const favTo = fs.createWriteStream(toFavPath, {
      flags: "w",
      encoding: "binary"
    });
    favFrom.pipe(
      favTo,
      { end: false }
    );
    printMessage("copied", "favicon file to the prod folder");
  }
};

// Copy and filter package.json file
const packageJsonFile = options => {
  const packageJson = path.join(APP_DIR, "package.json");
  if (fs.existsSync(packageJson)) {
    fs.readFile(packageJson, "utf8", (err, packageJsonContents) => {
      // Cleanup the devDependencies
      const regexRemoveDevDependencies = /,\n  "devDependencies": {([\s\S]*?)}/g;
      packageJsonContents = packageJsonContents.replace(
        regexRemoveDevDependencies,
        ""
      );

      // Cleanup the scripts list
      const regexRemoveNpmScripts = /"scripts": {([\s\S]*?)},\n /g;
      const prodScripts = `"scripts": {
    "prestart": "npm i",
    "start": "NODE_ENV=production node server"
  },
`;
      packageJsonContents = packageJsonContents.replace(
        regexRemoveNpmScripts,
        prodScripts
      );

      // Remove author
      const regexRemoveAuthor = /"author": "([\s\S]*?)",\n  /g;
      packageJsonContents = packageJsonContents.replace(regexRemoveAuthor, "");

      // write to prod
      const packageJson = path.join(PROD_DIR, "package.json");
      fs.writeFile(packageJson, packageJsonContents, err => {
        printMessage("copied", "packages.json file to the prod folder");
      });
    });
  }
};

// Copy over the server folder to DEPLOY
const serverFiles = hasServer => {
  if (fs.existsSync(SERVER_DEV_PATH)) {
    // Transpile server code to ES5
    printMessage("build", "transpile server for prod");
    shell.exec("babel server -d " + SERVER_PROD_PATH);

    // Created a web.config file
    const pathName = path.join(PROD_DIR, "web.config");
    fs.writeFile(pathName, templates.webConfig(), "utf8", err => {});
    printMessage("created", "web.config file in the prod folder");

    // build
  } else {
    // webconfig in the root of the DEPLOY folder
    const pathName = path.join(PROD_DIR, "web.config");
    fs.writeFile(pathName, templates.spaWebConfig(), "utf8", err => {});
    printMessage("copied", "web.config file in the prod folder");
  }
};

// Copy appseed.config
const appseedConfigFile = () => {
  const appseedConfigPath = path.join(APP_DIR, "appseed.config.js");
  const appseedProdPath = path.join(PROD_DIR, "appseed.config.js");
  if (fs.existsSync(appseedConfigPath)) {
    let x = fs.readFileSync(appseedConfigPath, "utf-8");
    x = x.replace("const REST_API_PORT = 1234;", "const REST_API_PORT = 8080;");
    fs.writeFile(appseedProdPath, x, err => {
      printMessage("copied", "appseed.config.js file to the prod folder");
    });
  }
};

// Copy appseed.config
const deployIndexRemoveScript = () => {
  const indexHtmlPath = path.join(PROD_DIR, "www/index.html");
  if (fs.existsSync(indexHtmlPath)) {
    let x = fs.readFileSync(indexHtmlPath, "utf-8");
    x = x.replace(
      `<script src="bundle.js"></script>`,
      `<script>(function () {if ('serviceWorker' in navigator) {navigator.serviceWorker.register('/sw.js');}})()</script>`
    );
    fs.writeFile(indexHtmlPath, x, err => {
      printMessage("Cleanup", "Removed the redundant bundle script tag");
    });
  }
};

/**
 * Fire off the functions
 *
 */
copyAssets();
copyDataFolder();
copyFavicon();
packageJsonFile();
serverFiles();
appseedConfigFile();
deployIndexRemoveScript();
