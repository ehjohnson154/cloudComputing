const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');

const reviews = require('../data/reviews');
const { Review } = require('../lib/database')

exports.router = router;
exports.reviews = reviews;

/*
 * Schema describing required/optional fields of a review object.
 */
const reviewSchema = {
  userid: { required: true },
  businessid: { required: true },
  dollars: { required: true },
  stars: { required: true },
  review: { required: false }
};


/*
 * Route to create a new review.
 */
// router.post('/', function (req, res, next) {
//   if (validateAgainstSchema(req.body, reviewSchema)) {

//     const review = extractValidFields(req.body, reviewSchema);

//     /*
//      * Make sure the user is not trying to review the same business twice.
//      */
//     const userReviewedThisBusinessAlready = reviews.some(
//       existingReview => existingReview
//         && existingReview.ownerid === review.ownerid
//         && existingReview.businessid === review.businessid
//     );

//     if (userReviewedThisBusinessAlready) {
//       res.status(403).json({
//         error: "User has already posted a review of this business"
//       });
//     } else {
//       review.id = reviews.length;
//       reviews.push(review);
//       res.status(201).json({
//         id: review.id,
//         links: {
//           review: `/reviews/${review.id}`,
//           business: `/businesses/${review.businessid}`
//         }
//       });
//     }

//   } else {
//     res.status(400).json({
//       error: "Request body is not a valid review object"
//     });
//   }
// });

//DATABASE
router.post('/', async function (req, res, next) {
  if (validateAgainstSchema(req.body, reviewSchema)) {
    const review = extractValidFields(req.body, reviewSchema);
    console.log("reaching inside validate")
    // const userReviewedThisBusinessAlready = reviews.some(
    //   existingReview => existingReview
    //     && existingReview.ownerid === review.ownerid
    //     && existingReview.businessid === review.businessid
    // ); //add logic for confirming user ownership
    const tempReview = new Review(review);
    tempReview.id = await Review.countDocuments()
    await tempReview.save();
    console.log(await Review.countDocuments())

    res.status(201).json({
      id: tempReview.id,
      links: {
        review: `/reviews/${tempReview.id}`,
        business: `/businesses/${tempReview.businessid}`
      }
    });

  } else {
    res.status(400).json({
      error: "Request body is not a valid business object"
    });
  }
});

/*
 * Route to fetch info about a specific review.
 */
// router.get('/:reviewID', function (req, res, next) {
//   const reviewID = parseInt(req.params.reviewID);
//   if (reviews[reviewID]) {
//     res.status(200).json(reviews[reviewID]);
//   } else {
//     next();
//   }
// });

router.get('/:reviewID', async function (req, res, next) {
  const photoID = parseInt(req.params.reviewID);
  result = await Review.countDocuments({id: reviewID });
  if (result) {
    reviewResult = await Review.find({id: reviewID}),
    res.status(200).json(reviewResult);
  } else {
    next();
  }
});


/*
 * Route to update a review.
 */
// router.put('/:reviewID', function (req, res, next) {
//   const reviewID = parseInt(req.params.reviewID);
//   if (reviews[reviewID]) {

//     if (validateAgainstSchema(req.body, reviewSchema)) {
//       /*
//        * Make sure the updated review has the same businessid and userid as
//        * the existing review.
//        */
//       let updatedReview = extractValidFields(req.body, reviewSchema);
//       let existingReview = reviews[reviewID];
//       if (updatedReview.businessid === existingReview.businessid && updatedReview.userid === existingReview.userid) {
//         reviews[reviewID] = updatedReview;
//         reviews[reviewID].id = reviewID;
//         res.status(200).json({
//           links: {
//             review: `/reviews/${reviewID}`,
//             business: `/businesses/${updatedReview.businessid}`
//           }
//         });
//       } else {
//         res.status(403).json({
//           error: "Updated review cannot modify businessid or userid"
//         });
//       }
//     } else {
//       res.status(400).json({
//         error: "Request body is not a valid review object"
//       });
//     }

//   } else {
//     next();
//   }
// });

router.put('/:reviewID', async function (req, res, next) {
  const reviewID = parseInt(req.params.photoID);
  exist = await Photo.countDocuments({id: photoID }); //ensure id exists
  if (exist) {
    console.log("reaches inside put")
    //if (existingPhoto && updatedPhoto.businessid === existingPhoto.businessid && updatedPhoto.userid === existingPhoto.userid)
    if (validateAgainstSchema(req.body, reviewSchema)) {
      const review = extractValidFields(req.body, reviewSchema);
      console.log("reaching inside validate")
      //const tempBusiness = new Business(business);
      await Review.findOneAndUpdate({id: reviewSchema}, review)
      res.status(200).json({
        links: {
          review: `/review/${reviewID}`,
          business: `/businesses/${review.businessid}`
        }
      });
  
    } else {
      res.status(400).json({
        error: "Request body is not a valid review object"
      });
    }
  }
  else{
    console.log("reaches next")
    next();
  }

});



/*
 * Route to delete a review.
 */
// router.delete('/:reviewID', function (req, res, next) {
//   const reviewID = parseInt(req.params.reviewID);
//   if (reviews[reviewID]) {
//     reviews[reviewID] = null;
//     res.status(204).end();
//   } else {
//     next();
//   }
// });

router.delete('/:reviewID', async function (req, res, next) {
  const reviewID = parseInt(req.params.photoID);
  exist = await Review.countDocuments({id: reviewID }).count().exec(); //ensure id exists
  if (exist) {
    await Review.deleteOne({id: reviewID})
    res.status(204).end();
  } else {
    next();
  }
});
