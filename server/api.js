import config from "../appseed.config.js";

const api = {
  test: (req, res) => {
    res.status(200).json({ localServer: "works!" });
  },

  routeDoesNotExist: (req, res) => {
    res.json({ route: "does not exist!" });
  }
};
export default api;
