Cloud dev notes:
4/3/2024



* A note of ‘PUT’ and ‘GET’

    'PUT' creates or updates a record
    'POST' always creates a record

    'PUT /records/{id}'
    (what do we do if id doesn't exist? does it create it?)

* 'PUT' Should be the opposite of 'GET'
    'PUT /records/12'
    'GET /records/{id}'

* Choosing endpoints based on description

"Need to be able to acces GIS data. Need to be able to add points with name/lat/lon.
Also need to be able to add "ways", which are oredered collections of points. 
And "areas" which are closed-loop ways. Need to be able to query for these items,
also filtering by name or lat/lon bounding box."

* Demo: ExpressJS Hello World
* Demo: using cURL to access the server

In-Class challenge: Modify the server to handle a post Request



GET /ways

[
    pointid,
    pointid,
    pointid,
    pointid,

]


Not really a "right" way to do it, just how many queries is required. Front end wants as few queries as possible, sometimes you need to do more.


Server wise:
No official http headers will ever start with X, allows for informational header
Be strict in what you send, liberal in what you recieve