const app = require("./app");
const env = require("./config/env");
const { connectDatabase } = require("./config/database");

async function startServer() {
  try {
    await connectDatabase();

    app.listen(env.port, () => {
      console.log(`API running at ${env.baseUrl}`);
      console.log(`Swagger documentation at ${env.baseUrl}/api-docs`);
    });
  } catch (error) {
    console.error("Failed to start API", error);
    process.exit(1);
  }
}

startServer();
