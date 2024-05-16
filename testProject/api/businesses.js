const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');

//is this
const { getBusiness, Business } = require('../lib/database')

const businesses = require('../data/businesses');
const { reviews } = require('./reviews');
const { photos } = require('./photos');

exports.router = router;
exports.businesses = businesses;

/*
 * Schema describing required/optional fields of a business object.
 */
const businessSchema = {
  ownerid: { required: true },
  name: { required: true },
  address: { required: true },
  city: { required: true },
  state: { required: true },
  zip: { required: true },
  phone: { required: true },
  category: { required: true },
  subcategory: { required: true },
  website: { required: false },
  email: { required: false }
};


/*
 * Route to return a list of businesses.
 */
router.get('/', async function (req, res) {
  //CURRENTLY UNRELEATED TO DATABASE, need something to grab pages from database

  /*
   * Compute page number based on optional query string parameter `page`.
   * Make sure page is within allowed bounds.
   */
  let page = parseInt(req.query.page) || 1;
  const numPerPage = 10;
  lengthofBusiness = await Business.countDocuments();
  console.log(lengthOfBusiness)
  const lastPage = Math.ceil(lengthofBusiness / numPerPage);
  page = page > lastPage ? lastPage : page;
  page = page < 1 ? 1 : page;

  /*
   * Calculate starting and ending indices of businesses on requested page and
   * slice out the corresponsing sub-array of busibesses.
   */
  const start = (page - 1) * numPerPage;
  const end = start + numPerPage;
  const pageBusinesses = Business.slice(start, end);

  /*
   * Generate HATEOAS links for surrounding pages.
   */
  const links = {};
  if (page < lastPage) {
    links.nextPage = `/businesses?page=${page + 1}`;
    links.lastPage = `/businesses?page=${lastPage}`;
  }
  if (page > 1) {
    links.prevPage = `/businesses?page=${page - 1}`;
    links.firstPage = '/businesses?page=1';
  }

  /*
   * Construct and send response.
   */
  res.status(200).json({
    businesses: pageBusinesses,
    pageNumber: page,
    totalPages: lastPage,
    pageSize: numPerPage,
    totalCount: businesses.length,
    links: links
  });

});

/*
 * Route to create a new business.
 */
// router.post('/', function (req, res, next) {
//   if (validateAgainstSchema(req.body, businessSchema)) {
//     const business = extractValidFields(req.body, businessSchema);
//     business.id = businesses.length;
//     businesses.push(business);
//     res.status(201).json({
//       id: business.id,
//       links: {
//         business: `/businesses/${business.id}`
//       }
//     });
//   } else {
//     res.status(400).json({
//       error: "Request body is not a valid business object"
//     });
//   }
// });

///DATABASE STUFF DONE SAVE PAGINATION///

//DATABASE TEST//
router.post('/', async function (req, res, next) {
  if (validateAgainstSchema(req.body, businessSchema)) {
    const business = extractValidFields(req.body, businessSchema);
    console.log("reaching inside POST validate")
    const tempBusiness = new Business(business);
    tempBusiness.id = await Business.countDocuments()
    await tempBusiness.save();
    // console.log(await Business.countDocuments())

    res.status(201).json({
      id: tempBusiness.id, //fix id?
      links: {
        business: `/businesses/${tempBusiness.id}`
      }
    });

  } else {
    res.status(400).json({
      error: "Request body is not a valid business object"
    });
  }
});
//END DATABASE TEST//

/*
 * Route to fetch info about a specific business.
 */
// router.get('/:businessid', function (req, res, next) {
//   const businessid = parseInt(req.params.businessid);
//   if (businesses[businessid]) {
//     /*
//      * Find all reviews and photos for the specified business and create a
//      * new object containing all of the business data, including reviews and
//      * photos.
//      */
//     const business = {
//       reviews: reviews.filter(review => review && review.businessid === businessid),
//       photos: photos.filter(photo => photo && photo.businessid === businessid)
//     };
//     Object.assign(business, businesses[businessid]);
//     res.status(200).json(business);
//   } else {
//     next();
//   }
// });

//DatabaseTest//
router.get('/:businessid', async function (req, res, next) {
  const businessid = parseInt(req.params.businessid);
  exist = await Business.countDocuments({id: businessid }).count().exec(); //ensure id exists
  if (exist) {
    console.log("reaching inside result")
    businessReturn = await getBusiness(businessid)
    /*
     * Find all reviews and photos for the specified business and create a
     * new object containing all of the business data, including reviews and
     * photos.
     */
    // const business = {
    //   //replace with searches for database
    //   reviews: reviews.filter(review => review && review.businessid === businessid),
    //   photos: photos.filter(photo => photo && photo.businessid === businessid)
    // };
    // Object.assign(business, businesses[businessid]);
    res.status(200).json(businessReturn);
  } else {
    next();
  }
});
//DatabaseTestEND//

/*
 * Route to replace data for a business.
 */

//database test
router.put('/:businessid', async function (req, res, next) {
  const businessid = parseInt(req.params.businessid);
  exist = await Business.countDocuments({id: businessid }).count().exec(); //ensure id exists
  if (exist) {
    console.log("reaches inside put")
    if (validateAgainstSchema(req.body, businessSchema)) {
      const business = extractValidFields(req.body, businessSchema);
      // business.id = businesses.length;
      // businesses.push(business);
      console.log("reaching inside PUT validate")
      //const tempBusiness = new Business(business);
      await Business.findOneAndUpdate({id: businessid}, business)
      res.status(201).json({
        id: business.id,
        links: {
          business: `/businesses/${business.id}`
        }
      });
  
    } else {
      res.status(400).json({
        error: "Request body is not a valid business object"
      });
    }
  }
  else{
    console.log("reaches next")
    next();
  }

});


// router.put('/:businessid', function (req, res, next) {
//   const businessid = parseInt(req.params.businessid);
//   if (businesses[businessid]) {

//     if (validateAgainstSchema(req.body, businessSchema)) {
//       businesses[businessid] = extractValidFields(req.body, businessSchema);
//       businesses[businessid].id = businessid;
//       res.status(200).json({
//         links: {
//           business: `/businesses/${businessid}`
//         }
//       });
//     } else {
//       res.status(400).json({
//         error: "Request body is not a valid business object"
//       });
//     }

//   } else {
//     next();
//   }
// });

/*
 * Route to delete a business.
 */
router.delete('/:businessid', async function (req, res, next) {
  const businessid = parseInt(req.params.businessid);
  exist = await Business.countDocuments({id: businessid }).count().exec(); //ensure id exists
  if (exist) {
    await Business.deleteOne({id: businessid})
    res.status(204).end();
  } else {
    next();
  }
});

