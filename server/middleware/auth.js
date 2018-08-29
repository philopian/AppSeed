require("dotenv").config();
import jwt from "jsonwebtoken";
const SECRET = process.env.JWT || "this is a secret shhhhhh";

const createToken = (authtype, payload) => {
  var date = new Date();
  var expires = moment()
    .add(5, "minutes")
    .valueOf();
  var claims = {
    iss: "appseed",
    sub: payload.subject,
    name: payload.name,
    auth: payload.auth,
    exp: expires,
    iat: date
  };
  return jwt.encode(claims, SECRET); // add token to the req (to be passed on to the get/route)
};

const auth = {
  tokenRequester(req, res, next) {
    /**
     *
     *
     * MAKE A CALL TO THE DB FOR USE
     *
     *
     */
    if (true) {
      const publicPayload = {
        subject: "sample jwt",
        name: "user name",
        auth: "admin"
      };

      // Add token to the body to pass to next express call
      req.body.token = createToken("basic", publicPayload);
      next();
    } else {
      req.body.token = "";
      res.sendStatus(404);
    }
  },

  // Check the headers of the http request for custom authorization header (req.headers.authorization)
  tokenValidator(req, res, next) {
    if (!req.headers.authorization) {
      return res.send({
        message: "You are not authorized to see this api"
      });
    }
    var token = req.headers.authorization.split(" ")[1];
    try {
      var decodedPayload = jwt.decode(token, SECRET);
      if (!decodedPayload.authtype) {
        res.status(401).send({
          message: "Authentication failed!"
        });
      } else {
        var now = moment();
        if (decodedPayload.exp >= now) {
          req.body._id = decodedPayload.sub;
          req.body.authtype = decodedPayload.authtype;
          next();
        } else {
          console.log("....Access token has expired");
          req.body.authtype = "nope";
          req.body.token = "";
          res.json({ AccessToken: "Has expired" });
        }
      }
    } catch (err) {
      return res.status(401).send({
        message: "You are not authorized to see this api"
      });
    }
  }
};
export default auth;
