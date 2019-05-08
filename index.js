require("dotenv").config();
const server = require("./api/server");

server.listen(5000, () => {
  console.log("\n===SERVER ON 5000===\n");
});
