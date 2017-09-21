require('dotenv').config();
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

const config = require('../config');
const apiRoute = require('./api');
const jwtAuth = require('./jwt-auth');
const db = require('./db');

const PORT = process.env.PORT || config.portAPI;
const app = express();

/******** Middleware *************************************/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('X-Powered-By', 'AppSeed');
  next();
});
app.use(compression()); // compress all responses 
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json


/******** API Calls	**************************************/
const api = new express.Router();
api.use(bodyParser.json());
app.use('/api/', api);

/******** TEST API	**************************************/
api.get('/test', apiRoute.test);
api.get('/testjsonapi', apiRoute.testJsonApi);
/*************************************************************************************
const api = new express.Router();
api.use(bodyParser.json());
app.use('/api/', api);
// api.post('/newuser', apiRoute.postNewUser);

//--Admin routes------
api.post('/login', jwtAuth.requester, apiRoute.login);

//--User CRUD
api.get('/users', apiRoute.getAllUsers);
api.get('/user/:id', apiRoute.getUser);
api.post('/user', apiRoute.addUser);
api.put('/user', apiRoute.updateUser);
api.delete('/user/:id', apiRoute.deleteUser);

//--Example CRUD
api.get('/examples', jwtAuth.validator, apiRoute.getAllExample);
api.get('/example/:id', jwtAuth.validator, apiRoute.getExample);
api.post('/example', jwtAuth.validator, apiRoute.addExample);
api.put('/example', jwtAuth.validator, apiRoute.updateExample);
api.delete('/example/:id', jwtAuth.validator, apiRoute.deleteExample);
*************************************************************************************/
api.all('/*', apiRoute.routeDoesNotExist); // Any other /api/* route gets this message


/******** All other routes redirect to the SPA ********/
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(config.webRoot)); // Serve all the files as static
  app.all('/*', (req, res) => {
    const indexHtml = path.join(config.webRoot, 'index.html');
    res.status(200).sendFile(indexHtml);
  });
}


/******** Listen on a port	*****************************/
app.listen(PORT, () => {
  console.log(chalk.bgBlue.bold(`...Nodejs server running in "${process.env.NODE_ENV}" mode`));
  console.log(chalk.blue(`The REST magic happens: http://localhost:${PORT}`));
});