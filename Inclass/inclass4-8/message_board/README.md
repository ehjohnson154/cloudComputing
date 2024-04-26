

Make a new server
'GET /messages' -- return a array of all the messages on the server
'POST /messages' post a new message, have a HATEOAS response

{
    "index": [message index],
    "links": {
        "message": "/messages/{id}"
    }
}

'GET /messages/{index}' -- return the message at that index, or error with 404 status if it's out of range.

Messages can be any JSON object

Example curl:
curl -H 'Content-Type: application/json' \ -d '{"subject": "Hello!", "message": "The message!"}' \ http://localhost:8086/messages