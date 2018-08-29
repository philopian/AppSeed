require("dotenv").config();
import path from "path";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";

import config from "../appseed.config.js";

import apiRoute from "./api";
import printMessage from "./tools/print-message";
import logger from "./tools/logger.js"; // Wire up logging if you choose e.g. logger.log({ level: "info", message: "hello!!!" });

const PORT = process.env.PORT || config.portApi;
const app = express();

/******** Middleware *************************************/
app.use(helmet());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("X-Powered-By", "AppSeed");
  next();
});
app.use(compression()); // compress all responses
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json

/******** API Calls	**************************************/
const api = new express.Router();
api.use(bodyParser.json());
app.use("/api/", api);

/******** TEST API	**************************************/
api.get("/test", (req, res) => res.status(200).json({ yes: "works" }));
/*************************************************************************************
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
api.all("/*", apiRoute.routeDoesNotExist); // Any other /api/* route gets this message

/******** All other routes redirect to the SPA ********/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(config.webRoot)); // Serve all the files as static
  app.all("/*", (req, res) => {
    const indexHtml = path.join(config.webRoot, "index.html");
    res.status(200).sendFile(indexHtml);
  });
}

/******** Listen on a port	*****************************/
app.listen(PORT, () => {
  printMessage("NODE_ENV", process.env.NODE_ENV);
  printMessage("REST Server", `http://localhost:${PORT}/api/`);
});
