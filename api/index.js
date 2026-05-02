const app = require("../src/app");
const { connectDatabase } = require("../src/config/database");

let connectionPromise;

module.exports = async (req, res) => {
  if (!connectionPromise) {
    connectionPromise = connectDatabase();
  }

  await connectionPromise;
  return app(req, res);
};
