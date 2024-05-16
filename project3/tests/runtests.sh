#!/bin/sh

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
}

stripID() {
    #$1 will use first argument to strip id is
    echo $(awk -F, '{print $1}' "$1" | awk -F: '{print $2}') | awk -F\" '{print $2}'    
}

# This is a comment
# This is where I'm testing the businesses endpoint
#these tests are BAD

### BUSINESS TESTING ###

##set up businesses

#-o output filename

status 'POST new business return success'
curl -X POST \
    -H 'Content-Type: application/json' \
    -o curl_output\
    -d '{"ownerid": "0",
    "name": "Strange place", 
    "address": "1111 N street ", 
    "city": "bend", 
    "state": "or", 
    "zip": "97703", 
    "phone": "111-1111-111", 
    "category": "restraunt", 
    "subcategory": ["pizza", "italian"]}' \
    http://localhost:8000/businesses/

cat curl_output
#makes variable, passes in curl output as input
#${} whatever the output of the command is, output it right there
businessID=${stripID curl_output}
echo $businessID


curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"ownerid": "1",
    "name": "Wild place", 
    "address": "1111 N street ", 
    "city": "bend", 
    "state": "or", 
    "zip": "97703", 
    "phone": "222-2222-222", 
    "category": "restraunt", 
    "subcategory": ["french", "gross"]}' \
    http://localhost:8000/businesses/


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

status 'GET Business pagination list return success'
curl http://localhost:8000/businesses/

status 'GET business-by-id NEEDS TO GET ID should return success IF ADDED PROPER ID'
curl http://localhost:3000/businesses/0

status 'GET business-by-id with false ID should return failure'
curl http://localhost:3000/businesses/9999

status 'DELETE newly created businness NEEDS ID'
curl -X "DELETE" http://localhost:3000/businesses/1  

status 'BAD DELETE missing businesss'
curl -X "DELETE" http://localhost:3000/businesses/999  



### REVIEWS ###


status 'POST review'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"user": "jack",
        "stars": "5", 
        "dollar_sign": "5", 
        "written_review": "this place sucked"}' \
    http://localhost:8000/reviews/

status 'BAD POST review with wrong data'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"user": "jack",
        "stars": "5", 
        "dollar_sign": "5", 
        "written_review": "this place sucked",
        "junk": "IM JUNK"}' \
    http://localhost:8000/businesses/0/reviews

status 'GET a particular review of business'
curl http://localhost:3000/reviews/0

status 'BAD GET a particular reviews of a nonexistant review'
curl http://localhost:3000/businesses/0/reviews/999



status 'DELETE newly created review'
curl -X "DELETE" http://localhost:8000/businesses/0/reviews/2

status 'BAD DELETE missing review'
curl -X "DELETE" http://localhost:8000/businesses/0/reviews/999

### END REVIEWS ###


### IMAGES ###

status 'POST new image'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"userid": "1",
        "businessid": "1",
        "caption": "this is a test"}' \
    http://localhost:8000/photos/

status 'BAD POST new image'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"image": ";_;",
        "caption": "so sad",
        "junk": "aha im junk!"}' \
    http://localhost:8000/photos/


status 'GET photo by id NEEDS ID'
curl http://localhost:8000/photos/0

status 'BAD GET for missing photo ID'
curl http://localhost:8000/photos/999


status 'DELETE newly created photo NEEDS ID'
curl -X "DELETE" http://localhost:8000/photos/1

status 'BAD DELETE missing photo'
curl -X "DELETE" http://localhost:8000/photos/999
### END IMAGES ##