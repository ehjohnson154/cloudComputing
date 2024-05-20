const router = require('express').Router();

exports.router = router;

const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
const { generateAuthToken } = require('../lib/authorization')
const { businesses } = require('./businesses');
const { reviews } = require('./reviews');
const { photos } = require('./photos');

const { User } = require('../lib/database')


const userSchema = {
  email: { required: true },
  password: { required: true },
  admin: { required: false },
};

const loginSchema = {
  email: { required: true },
  password: { required: true },
}


/*
 * Route to list all of a user's businesses.
 */
router.get('/:userid/businesses', function (req, res) {
  const userid = parseInt(req.params.userid);
  const userBusinesses = businesses.filter(business => business && business.ownerid === userid);
  res.status(200).json({
    businesses: userBusinesses
  });
});

/*
 * Route to list all of a user's reviews.
 */
router.get('/:userid/reviews', function (req, res) {
  const userid = parseInt(req.params.userid);
  const userReviews = reviews.filter(review => review && review.userid === userid);
  res.status(200).json({
    reviews: userReviews
  });
});

/*
 * Route to list all of a user's photos.
 */
router.get('/:userid/photos', function (req, res) {
  const userid = parseInt(req.params.userid);
  const userPhotos = photos.filter(photo => photo && photo.userid === userid);
  res.status(200).json({
    photos: userPhotos
  });
});


router.post('/', async function (req, res, next) {
  //check if valid
  if (validateAgainstSchema(req.body, userSchema)) {
    const user = extractValidFields(req.body, userSchema);
    console.log("reaching inside validate")

    const tempUser = new User(user);
    try{
      //try/except to stop server from crashing upon duplicate id
      await tempUser.save();
    }
    catch{
      res.status(400).json({
        error: "User email already exists, please use a new email"
      });
      return
    }
    /// console.log(await Review.countDocuments())

    res.status(201).end();

  } else {
    res.status(400).json({
      error: "Request body is not a valid business object"
    });
  }
});


router.post('/login', async function (req, res, next) {
  //check if valid

  //if user sends a email and password
  if (validateAgainstSchema(req.body, loginSchema)) {
    const user = extractValidFields(req.body, loginSchema);
    //then find user in database
    findUser = await User.find({email: user.email});
    //if user exists
    if (findUser){ 
      console.log("found user sucessful")
      //then check against password
      //if password matches hashed password
      
      if (User.comparePassword(user.password)){
        console.log("successful authentication")
        const token = generateAuthToken(req.body.userID);
        res.status(200).send({ token: token });
      }
      else {
        res.status(400).json({
          error: "Failed to authenticate password"
        });       
      }
    }
    else {
      res.status(400).json({
        error: "Failed to find user"
      });       
    }
  } else {
    res.status(400).json({
      error: "Request body is not a valid user login"
    });
  }
});