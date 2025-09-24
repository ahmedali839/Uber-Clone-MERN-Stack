const http = require("http")
const app = require("./app.js")
const { initializeSocket } = require("./socket")
const port = process.env.PORT;

const server = http.createServer(app);

// initialize socket io 
initializeSocket(server);

server.listen(port || 3000, () => {
    console.log(`Server running on ${port}`);
})