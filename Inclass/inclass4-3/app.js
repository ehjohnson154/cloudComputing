var express = require('express');

var app = express();

var port = 8086;

// function on_ready() {
//     console.log("server ready!");
// }


//handle json
app.use(express.json()); //option A
// app.use(bodyparser.json()); //option B

// Start listening on that port for connections
// list on port number, then pointer to function

//app.listen(port, on_ready);
app.listen(port, () => {
    console.log("server ready!");
});

// Handle certain API endpoints

//response includes what we respond with like 404, 200 ok, body, posting, etc
app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Hello, world");
});

app.get("/foo", (req, res, next) => {
    res.status(200);
    console.log(req.query);
    res.send("foo endpoint");
});

//curl -H 'Content-Type: application/json' -d '{"a":2}' -X POST 'http://localhost:8086/post'


app.post("/post", (req, res, next) => {
    res.status(200);
    req.body;
    console.log(req.body);
    res.send("Post endpoint");
});

