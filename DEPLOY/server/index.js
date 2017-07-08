import path from 'path';
import chalk from 'chalk';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

const config = require('../config');
const apiRoute = require('./api');
const jwtAuth = require('./jwt-auth');
const db = require('./db');

const app = express();

/******** Middleware *************************************/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('X-Powered-By', 'AppSeed');
  next();
});


app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json


/******** API Calls	**************************************/
const api = new express.Router();
api.use(bodyParser.json());
app.use('/api/', api);



/******** TEST API	**************************************/
api.get('/test', apiRoute.test);
api.get('/testjsonapi', apiRoute.testJsonApi);

/******** TEST API	**************************************/

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

api.all('/*', apiRoute.allOtherRoutes); // Any other /api/* route gets this message
*************************************************************************************/




/******** All other routes redirect frontend static ********/
// let www = path.resolve(config.webRoot, 'index.html');
// if (app.get('env') === 'production') {
//   www = path.resolve(config.distRoot, 'index.html');
// }
app.all('/*', (req, res) => {
  res.send({ "error": "not a valid route" });
});

/******** Listen on a port	*****************************/
app.listen(config.portAPI, () => {
  console.log(chalk.blue(`The REST magic happens: http://localhost:${config.portAPI}`));
});