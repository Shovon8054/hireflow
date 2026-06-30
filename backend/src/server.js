import http from "http";
import dotenv from "dotenv";

import app from "./app.js";
import db from "./config/db.js";

import { initSocket } from "./config/socket.js";
import { disableExpiredJobs } from "./controllers/company/jobController.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// create HTTP server 
const server = http.createServer(app);

// initialize Socket.io
initSocket(server);

// Disable expired jobs every hour
setInterval(async () => {
    try {
        await disableExpiredJobs();
        console.log("Expired jobs disabled");
    } catch (err) {
        console.error(err);
    }
}, 3600000);

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});