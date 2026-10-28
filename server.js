import { createServer } from "node:http";
import { app } from "./src/app.js";

const port = Number(process.env.PORT) || 3100;
const server = createServer(app);

server.on("error", (error) => {
  console.error({ event: "server_failed", code: error.code });
  process.exitCode = 1;
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Demo server: http://localhost:${port}`);
});
