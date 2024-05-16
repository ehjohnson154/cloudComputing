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
#$() whatever the output of the command is, output it right there
# dont use '' tells shell not to interpret
businessID=$(stripID curl_output)
echo $businessID