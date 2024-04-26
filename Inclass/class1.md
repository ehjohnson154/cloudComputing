We want a API to access a UFO sighting database. 
We want to be able to add new sightings, change sighting status to things 
like "suspected", "confirmed", or "hoax", detected sightings, and list sightings.
We should be ablew to list them zipcode or lat/long and/or database


API challenges:

GET:

-return entire database

-return by sighting type
-Return by zipcodeReturn by lat/long
-Return by date


POST:

New sighting

PUT: 
    -Update sighting



Class idea 1:

GET /sightings/location
Request
    lat: number
    lon: number
    zip: number
GET /sightings/suspected
GET /sightings/confirmed
GET /sightings
GET /sightings?type=hoax
Request
    type: strings