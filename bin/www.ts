import http from "http";
import app from "../app";
const PORT = process.env.PG_PORT || 8686;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
