#!/bin/sh

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
}

# This is a comment
# This is where I'm testing the businesses endpoint

### BUSINESS TESTING ###

status 'GET Business list return success'
curl http://localhost:3000/businesses

status 'GET business-by-id should return success'
curl http://localhost:3000/businesses/1

status 'GET business-by-id with false ID should return failure'
curl http://localhost:3000/businesses/9999

status 'POST new business return success'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name": "Strange place", 
    "address": "1111 N street ", 
    "city": "bend", "state": "or", 
    "zip_code": "97703", 
    "phone": "111-1111-111", 
    "category": "restraunt", 
    "subcategories": ["pizza", "italian"]}' \
    http://localhost:3000/businesses


status 'BAD POST attempt return failure'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name": "Strange place", 
    "address": "1111 N street ", 
    "city": "bend", "state": "or", 
    "zip_code": "97703", 
    "phone": "111-1111-111", 
    "category": "restraunt", 
    "subcategories": ["pizza", "italian"],
    "BADTHING": "AAAAA"}' \
    http://localhost:3000/businesses

status 'DELETE newly created businness'
curl -X "DELETE" http://localhost:3000/businesses/2  

status 'BAD DELETE missing businesss'
curl -X "DELETE" http://localhost:3000/businesses/999  

status 'GET just the info of business 0'
curl http://localhost:3000/businesses/0/information

status 'BAD GET just the info of missing businness'
curl http://localhost:3000/businesses/999/information


status 'GET individual endpoints of business 0'
curl http://localhost:3000/businesses/0/information/name
curl http://localhost:3000/businesses/0/information/address
curl http://localhost:3000/businesses/0/information/city
curl http://localhost:3000/businesses/0/information/state
curl http://localhost:3000/businesses/0/information/zip_code
curl http://localhost:3000/businesses/0/information/category
curl http://localhost:3000/businesses/0/information/subcategories
curl http://localhost:3000/businesses/0/information/website
curl http://localhost:3000/businesses/0/information/email


status 'GET bad individual endpoints of a missing business, should return failure'
curl http://localhost:3000/businesses/999/information/name
curl http://localhost:3000/businesses/999/information/address
curl http://localhost:3000/businesses/999/information/city
curl http://localhost:3000/businesses/999/information/state
curl http://localhost:3000/businesses/999/information/zip_code
curl http://localhost:3000/businesses/999/information/category
curl http://localhost:3000/businesses/999/information/subcategories
curl http://localhost:3000/businesses/999/information/website
curl http://localhost:3000/businesses/999/information/email



status 'PUT business-name. All businesses follow same function'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"name": "strange place"}' \
    http://localhost:3000/businesses/0/information/name

status 'BAD PUT business-name of nonexistant businesss. All businesses follow same function.'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"name": "strange place"}' \
    http://localhost:3000/businesses/999/information/name

# Here's an example of splitting a big command across
# multiple lines by ending the line with "\":

# curl -v -X PUT \
#     -H 'Content-Type: application/json' \
#     -d '{"starRating": "1", "dollarRaing": "1", "review": "Do not wish to return"}' \
#     http://localhost:3000/reviews/2

# etc.

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