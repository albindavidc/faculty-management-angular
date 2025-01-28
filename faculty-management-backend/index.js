import http from "http";
import app from "./app.js";

const server = http.createServer(app);
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
  console.log("Listening to the port..." + port);
});
