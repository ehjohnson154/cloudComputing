const express = require('express');
//const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8086;

let count = 0;

// app.use(bodyParser.json());

// app.use(logger);

app.listen(port, () => {
    console.log("== Server is listening on port:", port);
  });

app.get('/counter', (req, res, next) => {
    count++;
    res.send({
        "count": count

    })
    //res.send(Sring(count))
});


app.use('*', (req, res, next) => {
  res.status(404).send({
    err: "The path " + req.originalUrl + " doesn't exist"
  });
});

