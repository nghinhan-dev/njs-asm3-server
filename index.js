require("dotenv").config();

const { createServer } = require("http");
const { createApp } = require("./src/createApp");

const httpServer = createServer();

(async () => {
  await createApp(httpServer);
  httpServer.listen(process.env.PORT || 5000, () =>
    console.log(`Rocking on ${process.env.PORT || 5000} 🚀`)
  );
})();
