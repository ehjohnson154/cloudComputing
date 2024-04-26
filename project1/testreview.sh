#!/bin/sh

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
}

### REVIEWS ###
status 'GET all reviews of a business'
curl http://localhost:3000/businesses/0/reviews

status 'GET a particular reviews of a business'
curl http://localhost:3000/businesses/0/reviews/0

status 'BAD GET a particular reviews of a nonexistant review'
curl http://localhost:3000/businesses/0/reviews/999

status 'POST review'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"user": "jack",
        "stars": "5", 
        "dollar_sign": "5", 
        "written_review": "this place sucked"}' \
    http://localhost:3000/businesses/0/reviews


status 'PUT review stars'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"stars": "5"}' \
    http://localhost:3000/businesses/0/reviews/0/stars

status 'PUT review stars'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"dollar_sign": "1"}' \
    http://localhost:3000/businesses/0/reviews/0/dollar_sign


status 'DELETE newly created review'
curl -X "DELETE" http://localhost:3000/businesses/0/reviews/2

status 'BAD DELETE missing review'
curl -X "DELETE" http://localhost:3000/businesses/0/reviews/999

### END REVIEWS ###


### IMAGES ###
status 'GET all photos for a businesss'
curl http://localhost:3000/businesses/0/photos

status 'BAD GET all photos for a nonexistant businesss'
curl http://localhost:3000/businesses/999/photos

status 'GET all photos for a businesss'
curl http://localhost:3000/businesses/0/photos

status 'POST new image'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"image": ";_;",
        "caption": "so sad"}' \
    http://localhost:3000/businesses/0/photos

status 'BAD POST new image'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"image": ";_;",
        "caption": "so sad",
        "junk": "aha im junk!"}' \
    http://localhost:3000/businesses/0/photos

status 'PUT edit caption'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"caption": "strange place this is"}' \
    http://localhost:3000/businesses/0/photos/0

status 'DELETE newly created photo'
curl -X "DELETE" http://localhost:3000/businesses/0/photos/2

status 'BAD DELETE missing photo'
curl -X "DELETE" http://localhost:3000/businesses/0/photos/999
### END IMAGES ##