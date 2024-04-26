const express = require('express');
const app = express();

//do requirements for other files here if desired

// Business name
// Business street address
// Business city
// Business state
// Business ZIP code
// Business phone number
// Business category and subcategories (e.g. category "Restaurant" and subcategory "Pizza")

// The following information may also optionally be included when a new business is added:

// Business website
// Business email

// class Business {
//     constructor(name, address, city, state, zip_code, phone, category, subcategories) {
//       this.name = name;
//       this.address = address;
//       this.city = city;
//       this.state = state;
//       this.zip_code = zip_code;
//       this.phone = phone;
//       this.category = category;
//       this.subcategories = subcategories;
//     }
//   }

var businesses = [
    {
        name: "Nice place",
        information: {
            address: "1111 N street ",
            city: "bend",
            state: "or",
            zip_code: "97703",
            phone: "111-1111-111",
            category: "restraunt",
            subcategories: ["pizza", "italian"],
            email: "nice@place.com",
            website: "nice.com"
        },
        reviews: [
            {
                user: "john",
                stars: "1",
                dollar_sign: "2",
                written_review: "this place was not nice at all"
        
            },
            {
                user: "fred",
                stars: "1",
                dollar_sign: "1",
                written_review: "better than expected"
            }
        ],
        photos: [
            {
                image: "HI IM A IMAGE { ^_^ }",
                caption: "im a terrible artist"
            },
            {
                image: "HI IM A BETTER  IMAGE :(",
                caption: "I lied"
            }
        ]
        


    },
    {
        name: "bad place",
        information: {
            address: "1111 S street ",
            city: "bend",
            state: "or",
            zip_code: "97703",
            phone: "222-2222-222",
            category: "restraunt",
            subcategories: ["trash", "american"]
        },
        reviews: [
            {
                user: "john",
                stars: 1,
                dollar_sign: 2,
                written_review: "this place was not nice at all"
        
            },
            {
                user: "fred",
                stars: 5,
                dollar_sign: 2,
                written_review: "better than expected"
            }
        ],
        photos: [
            {
                image: "HI IM A IMAGE { ^_^ }",
                caption: "im a terrible artist"
            }
        ]
    },
];

var port = 3000;


//handle json
app.use(express.json()); //option A
// app.use(bodyparser.json()); //option B

// Start listening on that port for connections
// list on port number, then pointer to function

//app.listen(port, on_ready);
app.listen(port, () => {
    console.log("server ready!");
});

console.log("Hello world.");

app.get('/', function (req, res, next) {
    res.status(200).send("Hello world");
});

app.get('/Business_list', function (req, res, next) {

    res.status(200).send("Hello world");
});

// app.use('*', function (req, res) {
//     res.status(404).send({
//         err: "The requested resource doesn't exist"
//     });
// });

function return404(res) {
    res.status(404).send({
        err: "The requested resource doesn't exist"
    });
}

const businesses_required = [
    "name" , 
    "address",
    "city",
    "state",
    "zip_code",
    "phone",
    "category",
    "subcategories"   
]

const businesses_optional = [
    "website",  
    "email", 
]

const review_required = [
    "user",
    "stars",
    "dollar_sign",
]

const review_optional = [
    "written_review"
]

const images_required = [
    "image"
]

const images_optional = [
    "caption"
]

//pass in json data.
function jsonValidation(obj, req, opt) {

    // console.log(obj)
    // //console.log(obj[i])
    // console.log(req)
    // console.log(opt)
    objKeys = Object.keys(obj)
    // console.log(objKeys[0])

    for(let i = 0; i < req.length; i++) {
        if (Object.hasOwn(obj, req[i]) != true){
            console.log("false req" + req[i])
            return false
        }
    }
    for(let i = 0; i < objKeys.length; i++) {
        if (opt.includes(objKeys[i])!= true && req.includes(objKeys[i])!= true){
            console.log("false objkey " + objKeys[i])
            console.log("false opt " + opt.includes(objKeys[i]))
            console.log("false req " + req.includes(objKeys[i]))
            return false
        }
    }
    return true
}

//for grabbing particular info from a business
function getInfo(businessID, info, res){
    //console.log(businesses[businessID])
    if (businesses[businessID]) {
        //console.log("triggers")
        //console.log(businesses[businessID])
        //return businesses[businessID]
        res.status(200).json(businesses[businessID]["information"][info]);
    } else {
        return404(res); //do I need to assign a function called next? or will app.use work?
    }
}

//for putting particular info for a business
function putInfo(businessID, info, stuff, res){
    console.log(stuff)
    console.log(stuff[info])
    if (businesses[businessID]) {
        console.log("in success")
        //console.log("triggers")
        //console.log(businesses[businessID])
        //return businesses[businessID]
        businesses[businessID]["information"][info] = stuff[info]
        res.status(200).json({
            links: {
                stuff: '/businesses/' + businessID + '/information/' + info
            }
        });
        //res.status(200).json(businesses[businessID]["information"][info]);
    } else {
        console.log("in failure")
        return404(res); //do I need to assign a function called next? or will app.use work?
    }
}

function getReviewInfo(businessID, reviewID, info, res){
    console.log("in GET reviews")
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]["reviews"][reviewID]) {
        res.status(200).json(businesses[businessID]["reviews"][req.params.reviewID][info]);
    } else {
        return404(res); //do I need to assign a function called next? or will app.use work?
    }
}

function putReviewInfo(businessID, reviewID, info, stuff, res){
    console.log("in PUT reviews")
    console.log(businesses[businessID]["reviews"][reviewID][info])
    console.log(stuff[info])
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]["reviews"][reviewID]) {
        businesses[businessID]["reviews"][reviewID][info] = stuff[info]
        // res.status(200).json(businesses[businessID]["reviews"][req.params.reviewID][info]);
        res.status(200).json({
            links: {
                stuff: '/businesses/' + businessID + '/reviews/' + info
            }
        });
    } else {
        return404(res); //do I need to assign a function called next? or will app.use work?
    }
}


// Business API

//     /Business
//         Get /Business_List // Grabs a list of all businesses by ID

app.get('/businesses', function (req, res, next) {
    res.status(200).json(businesses);
    console.log('getting business list')
});

//     /Business/{id}
//         Get /Business/{id} // grabs ALL data around that business, including reviews and photos
//         POST Business/{id} // Create new business, defaults to generatin ID if none given?
//         DELETE /Business/{id} // Remove business

app.get('/businesses/:businessID', function (req, res, next) {
    //console.log(req)
    console.log("in GET business id")
    var businessID = parseInt(req.params.businessID);
    //console.log(businesses[businessID])
    if (businesses[businessID]) {

        res.status(200).json(businesses[businessID]);
    } else {
        return404(res); //do I need to assign a function called next? or will app.use work?
    }

});

app.post('/businesses/', function (req, res, next) {

    if (jsonValidation(req.body, businesses_required, businesses_optional))
        {

        businesses.push(req.body);

        var id = businesses.length - 1;
        console.log("posted business")
        res.status(201).json({
        id: id,
        links: {
            businesses: '/businesses/' + id
        }
        });
        //console.log("posted business")
    }
    else {
        res.status(400).json({
            err: "Request is missing JSON body with one or more appropriate fields"
        });
    }
});

app.delete('/businesses/:businessID', function (req, res, next) {
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]) {
        businesses[businessID] = null;
        res.status(204).end();
        console.log("delete business")
    } else {
        return404(res);
    }
});

//         /Business/{id}/information // provides basic information including name, address, phone number, website, email
//             GET /Business/{id}/information
app.get('/businesses/:businessID/information', function (req, res, next) {
    console.log("in GET business id")
    var businessID = parseInt(req.params.businessID);
    //console.log(businesses[businessID])
    if (businesses[businessID]) {
        //console.log("triggers")
        //console.log(businesses[businessID])
        res.status(200).json(businesses[businessID]);
    } else {
        return404(res); //do I need to assign a function called next? or will app.use work?
    }
});

//         various API calls to access individual fields
//             //api calls don't need to delete, as its assumed all information is required save the optional fields

//             GET /Business/{id}/information/name 
//             PUT /Business/{id}/information/name 

app.get('/businesses/:businessID/information/name', function (req, res, next) {
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]) {
        res.status(200).json(businesses[businessID]['name']);
    } else {
        return404(res); //do I need to assign a function called next? or will app.use work?
    }
});

app.put('/businesses/:businessID/information/name', function (req, res, next) {
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]) {
        res.status(200).json(businesses[businessID]['name']);
    } else {
        return404(res); //do I need to assign a function called next? or will app.use work?
    }
});

//             GET /Business/{id}/information/street address
//             PUT /Business/{id}/information/street address  
      
app.get('/businesses/:businessID/information/address', function (req, res, next) {
    getInfo(parseInt(req.params.businessID), 'address', res)
});
app.put('/businesses/:businessID/information/address', function (req, res, next) {
    putInfo(parseInt(req.params.businessID), 'address', req.body, res)
});

app.get('/businesses/:businessID/information/city', function (req, res, next) {
    getInfo(parseInt(req.params.businessID), 'city', res)
});
app.put('/businesses/:businessID/information/city', function (req, res, next) {
    putInfo(parseInt(req.params.businessID), 'city', req.body, res)
});

app.get('/businesses/:businessID/information/state', function (req, res, next) {
    getInfo(parseInt(req.params.businessID), 'state', res)
});
app.put('/businesses/:businessID/information/state', function (req, res, next) {
    putInfo(parseInt(req.params.businessID), 'state', req.body, res)
});

app.get('/businesses/:businessID/information/zip_code', function (req, res, next) {
    getInfo(parseInt(req.params.businessID), 'zip_code', res)
});
app.put('/businesses/:businessID/information/zip_code', function (req, res, next) {
    putInfo(parseInt(req.params.businessID), 'zip_code', req.body, res)
});

app.get('/businesses/:businessID/information/phone', function (req, res, next) {
    getInfo(parseInt(req.params.businessID), 'phone', res)
});
app.put('/businesses/:businessID/information/phone', function (req, res, next) {
    putInfo(parseInt(req.params.businessID), 'phone', req.body, res)
});

app.get('/businesses/:businessID/information/category', function (req, res, next) {
    getInfo(parseInt(req.params.businessID), 'category', res)
});
app.put('/businesses/:businessID/information/category', function (req, res, next) {
    putInfo(parseInt(req.params.businessID), 'category', req.body, res)
});

app.get('/businesses/:businessID/information/subcategories', function (req, res, next) {
    getInfo(parseInt(req.params.businessID), 'subcategories', res)
});
app.put('/businesses/:businessID/information/subcategories', function (req, res, next) {
    putInfo(parseInt(req.params.businessID), 'subcategories', req.body, res)
});


app.get('/businesses/:businessID/information/website', function (req, res, next) {
    getInfo(parseInt(req.params.businessID), 'website', res)
});
app.put('/businesses/:businessID/information/website', function (req, res, next) {
    putInfo(parseInt(req.params.businessID), 'website', req.body, res)
});
app.delete('/business/:businessID/information/website', function (req, res, next) {
    //res.status(200).send("Hello world");
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]['website']) {
        businesses[businessID]['website'] = null;
        res.status(204).end();
        console.log("delete website")
    } else {
        return404(res);
    }
});

app.get('/businesses/:businessID/information/email', function (req, res, next) {
    getInfo(parseInt(req.params.businessID), 'email', res)
});
app.put('/businesses/:businessID/information/email', function (req, res, next) {
    putInfo(parseInt(req.params.businessID), 'email', req.body, res)
});

app.delete('/businesses/:businessID/information/email', function (req, res, next) {
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]['email']) {
        businesses[businessID]['email'] = null;
        res.status(204).end();
        console.log("delete email")
    } else {
        return404(res);
    }
});


//     /Business/{id}/Review //Get a list of all reviews
//         Get /Business/{id}/Review

app.get('/businesses/:businessID/reviews', function (req, res, next) {
    console.log("in GET reviews")
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]) {
        res.status(200).json(businesses[businessID]["reviews"]);
    } else {
        return404(res); //do I need to assign a function called next? or will app.use work?
    }
});

//     Get /Business/{id}/Review/{user_id}/ //lists all reviews from user

//NOT WORRYING ABOUT ID

//         /Business/{id}/Review/{user_id}/{id} // Interact with one specific review
//             Get /Business/{id}/Review/{user_id}/{id} 
app.get('/businesses/:businessID/reviews/:reviewID', function (req, res, next) {
    console.log("in GET reviews")
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]["reviews"][req.params.reviewID]) {
        res.status(200).json(businesses[businessID]["reviews"][req.params.reviewID]);
    } else {
        return404(res);
    }
});

//PUT /Business/{id}/Review/{user_id}/{id} 
app.put('/businesses/:businessID/reviews/:reviewID', function (req, res, next) {
    console.log("in PUT reviews")
    var businessID = parseInt(req.params.businessID);

    if (businesses[businessID]["reviews"] && jsonValidation(req.body, review_required, review_optional))
        {
        businesses[businessID]["reviews"][req.params.reviewID] = req.body;
        res.status(200).json(businesses[businessID]["reviews"][req.params.reviewID]);
    }
    else {
        return404(res)
        };
    console.log("put review");
});
//             POST /Business/{id}/Review/{user_id}/{id}
app.post('/businesses/:businessID/reviews/', function (req, res, next) {
    console.log("in POST reviews")
    var businessID = parseInt(req.params.businessID);

    if (businesses[businessID] && jsonValidation(req.body, review_required, review_optional))
        {
        businesses[businessID]["reviews"].push(req.body);
        var id = businesses[businessID]["reviews"].length - 1;
        console.log("posted business review")
        res.status(201).json({
        id: id,
        links: {
            businesses: '/businesses/' + businessID + '/reviews/' + id
        }
        });
        console.log("posted review")
    }

    else {
        return404(res)
        };
});

app.get('/businesses/:businessID/reviews/:reviewID/stars', function (req, res, next) {
    getReviewInfo(parseInt(req.params.businessID), 'stars', res)
});
app.put('//businesses/:businessID/reviews/:reviewID/stars', function (req, res, next) {
    console.log("in first put statement")
    putReviewInfo(parseInt(req.params.businessID), 'stars', req.body, res)
});

// app.put('/businesses/:businessID/information/address', function (req, res, next) {
//     putInfo(parseInt(req.params.businessID), 'address', req.body, res)
// });


app.get('/businesses/:businessID/reviews/:reviewID/dollar_sign', function (req, res, next) {
    getReviewInfo(parseInt(req.params.businessID), 'dollar_sign', res)
});
app.put('//businesses/:businessID/reviews/:reviewID/dollar_sign', function (req, res, next) {
    putReviewInfo(parseInt(req.params.businessID), 'dollar_sign', req.body, res)
});

app.get('/businesses/:businessID/reviews/:reviewID/written_review', function (req, res, next) {
    getReviewInfo(parseInt(req.params.businessID), 'written_review', res)
});
app.put('/businesses/:businessID/reviews/:reviewID/written_review', function (req, res, next) {
    putReviewInfo(parseInt(req.params.businessID), 'written_review', req.body, res)
});

//             DELETE /Business/{id}/Review/{user_id}/{id}
app.delete('/businesses/:businessID/reviews/:reviewID', function (req, res, next) {
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]['reviews'][req.params.reviewID]) {
        businesses[businessID]['reviews'][req.params.reviewID] = null;
        res.status(204).end();
        console.log("delete review")
    } else {
        return404(res);
    }
});


//             various API calls to access individual fields
//                 Get /Business/{id}/Review/{user_id}/{id}/stars
//                 PUT /Business/{id}/Review/{user_id}/{id}/stars     

//                 Get /Business/{id}/Review/{user_id}/{id}/dollars
//                 PUT /Business/{id}/Review/{user_id}/{id}/dollars

//                 Get /Business/{id}/Review/{user_id}/{id}/review
//                 PUT /Business/{id}/Review/{user_id}/{id}/review
//                 DELETE /Business/{id}/Review/{user_id}/{id}/review                    

//     /Business/{id}/photo // Get a list of all photos
//         GET /Business/{id}/photo
app.get('/businesses/:businessID/photos', function (req, res, next) {
    console.log("in GET photos")
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]) {
        res.status(200).json(businesses[businessID]["photos"]);
    } else {
        return404(res); //do I need to assign a function called next? or will app.use work?
    }
});


//         /Business/{id}/photo/{id} // Get a specific photo by ID
//             GET /Business/{id}/photo/{id} 
app.get('/businesses/:businessID/photos/:photoID', function (req, res, next) {
    console.log("in GET photos")
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]) {
        res.status(200).json(businesses[businessID]["photos"][req.params.photoID]);
    } else {
        return404(res);
    }
});

//             DEL /Business/{id}/photo/{id} 

// app.put('/businesses/:businessID/photos/:photoID/caption', function (req, res, next) {
//     console.log("in PUT photo")
//     var businessID = parseInt(req.params.businessID);

//     if (businesses[businessID]["photos"] && jsonValidation(req.body, review_required, review_optional))
//         {
//         businesses[businessID]["photos"][req.params.reviewID] = req.body;
//         res.status(200).json(businesses[businessID]["photos"][req.params.photoID]);
//     }
//     else {
//         return404(res)
//         };
//     console.log("put photo");
// });

app.put('/businesses/:businessID/photos/:photoID/caption', function (req, res, next) {
    console.log("in PUT photo")
    var businessID = parseInt(req.params.businessID);

    if (businesses[businessID]["photos"][req.params.photoID])
        {
        businesses[businessID]["photos"][req.params.photoID]["caption"] = req.body["caption"];
        // res.status(200).json(businesses[businessID]["photos"][req.params.photoID]);
        res.status(200).json({
            links: {
                stuff: '/businesses/' + businessID + '/photos/' + req.params.photoID + '/caption'
            }
        });
    }
    else {
        return404(res)
        };
    console.log("put photo");
});


app.post('/businesses/:businessID/photos', function (req, res, next) {
    console.log("in POST photo")
    var businessID = parseInt(req.params.businessID);

    if (businesses[businessID] && jsonValidation(req.body, images_required, images_optional))
        {
        businesses[businessID]["photos"].push(req.body);
        var id = businesses[businessID]["photos"].length - 1;
        console.log("posted business photos")
        res.status(201).json({
        id: id,
        links: {
            businesses: '/businesses/' + businessID + '/photos/' + id
        }
        });
        console.log("posted review")
    }

    else {
        return404(res)
        };
});

app.delete('/businesses/:businessID/photos/:photoID', function (req, res, next) {
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]['photos'][req.params.photoID]) {
        businesses[businessID]['photos'][req.params.photoID] = null;
        res.status(204).end();
        console.log("delete photo")
    } else {
        return404(res);
    }
});