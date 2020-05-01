const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('<h1>Welcome from the server.js</h1>');
});

const port = 3050;
server.listen(port, () =>
    console.log(`=== Server Listening on port ${ port } ===`)
)