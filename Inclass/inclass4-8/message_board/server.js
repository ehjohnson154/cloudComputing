const express = require('express');

//const bodyParser = require('body-parser');
const app = express();
app.use(express.json()); //need this
const port = process.env.PORT || 8086;


const messages = []

// app.use(bodyParser.json());

// app.use(logger);

app.listen(port, () => {
    console.log("== Server is listening on port:", port);
  });

app.get('/messages', (req, res, next) => {
    res.send(messages)
});


app.post('/messages', (req, res, next) => {
    current_message_index++;
    const index = messages.length;
    messages.push(req.body);

    res.send({
        "index": index, //current_message_index     ?
        "links": {
            "message": `/messages/${index}`
        }
    });
});

app.get('/messages/:index', (req, res, next) => { //if in path you include colon and symbol name, we can grab that value
    const index = req.params.index;
    
    if(index < 0 || index>= messages.length) { //error checking for out of bounds index.
        res.status(404).send({"error": 'Message ${index} not found'});
        next();
    }
    res.send(messages[index])
});

app.delete('/messages/:index', (req, res, next) => {
    const index = req.params.index;

    if(index < 0 || index>= messages.length) { //error checking for out of bounds index.
        res.status(404).send({"error": 'Message ${index} not found'});
    }
    delete messages[index]
});

app.use('*', (req, res, next) => {
  res.status(404).send({
    err: "The path " + req.originalUrl + " doesn't exist"
  });
});

