const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');

const { Photo } = require('../lib/database')
const photos = require('../data/photos');

exports.router = router;
exports.photos = photos;



/*
 * Schema describing required/optional fields of a photo object.
 */
const photoSchema = {
  userid: { required: true },
  businessid: { required: true },
  caption: { required: false }
};


/*
 * Route to create a new photo.
 */
// router.post('/', function (req, res, next) {
//   if (validateAgainstSchema(req.body, photoSchema)) {
//     const photo = extractValidFields(req.body, photoSchema);
//     photo.id = photos.length;
//     photos.push(photo);
//     res.status(201).json({
//       id: photo.id,
//       links: {
//         photo: `/photos/${photo.id}`,
//         business: `/businesses/${photo.businessid}`
//       }
//     });
//   } else {
//     res.status(400).json({
//       error: "Request body is not a valid photo object"
//     });
//   }
// });

router.post('/', async function (req, res, next) {
  if (validateAgainstSchema(req.body, photoSchema)) {
    const photo = extractValidFields(req.body, photoSchema);
    console.log("reaching inside validate")


    await tempBusiness.save();


    const tempPhoto = new Photo(photo);
    tempPhoto.id = await Photo.countDocuments()
    await tempPhoto.save();
    console.log(await Photo.countDocuments())

    res.status(201).json({
      id: tempPhoto.id, //fix photo id?
      links: {
        photo: `/photos/${tempPhoto.id}`,
        business: `/businesses/${photo.businessid}`
      }
    });

  } else {
    res.status(400).json({
      error: "Request body is not a valid photo object"
    });
  }
});

/*
 * Route to fetch info about a specific photo.
 */
router.get('/:photoID', async function (req, res, next) {
  const photoID = parseInt(req.params.photoID);
  result = await Business.countDocuments({id: photoID });
  if (result) {
    photoResult = await Photo.find({id: photoID}),
    res.status(200).json(photoResult);
  } else {
    next();
  }
});

/*
 * Route to update a photo.
 */
// router.put('/:photoID', function (req, res, next) {
//   const photoID = parseInt(req.params.photoID);
//   if (photos[photoID]) {

//     if (validateAgainstSchema(req.body, photoSchema)) {
//       /*
//        * Make sure the updated photo has the same businessid and userid as
//        * the existing photo.
//        */
//       const updatedPhoto = extractValidFields(req.body, photoSchema);
//       const existingPhoto = photos[photoID];
//       if (existingPhoto && updatedPhoto.businessid === existingPhoto.businessid && updatedPhoto.userid === existingPhoto.userid) {
//         photos[photoID] = updatedPhoto;
//         photos[photoID].id = photoID;
//         res.status(200).json({
//           links: {
//             photo: `/photos/${photoID}`,
//             business: `/businesses/${updatedPhoto.businessid}`
//           }
//         });
//       } else {
//         res.status(403).json({
//           error: "Updated photo cannot modify businessid or userid"
//         });
//       }
//     } else {
//       res.status(400).json({
//         error: "Request body is not a valid photo object"
//       });
//     }

//   } else {
//     next();
//   }
// });

//database test
router.put('/:photoID', async function (req, res, next) {
  const photoID = parseInt(req.params.photoID);
  exist = await Photo.countDocuments({id: photoID }); //ensure id exists
  if (exist) {
    console.log("reaches inside put")
    //if (existingPhoto && updatedPhoto.businessid === existingPhoto.businessid && updatedPhoto.userid === existingPhoto.userid)
    if (validateAgainstSchema(req.body, photoSchema)) {
      const photo = extractValidFields(req.body, photoSchema);
      console.log("reaching inside validate")
      //const tempBusiness = new Business(business);
      await Review.findOneAndUpdate({id: photoID}, photo)
      res.status(200).json({
        links: {
          photo: `/photos/${photoID}`,
          business: `/businesses/${photo.businessid}`
        }
      });
  
    } else {
      res.status(400).json({
        error: "Request body is not a valid photo object"
      });
    }
  }
  else{
    console.log("reaches next")
    next();
  }

});

/*
 * Route to delete a photo.
 */
// router.delete('/:photoID', function (req, res, next) {
//   const photoID = parseInt(req.params.photoID);
//   if (photos[photoID]) {
//     photos[photoID] = null;
//     res.status(204).end();
//   } else {
//     next();
//   }
// });

router.delete('/:photoID', async function (req, res, next) {
  const photoID = parseInt(req.params.photoID);
  exist = await Photo.countDocuments({id: photoID }).count().exec(); //ensure id exists
  if (exist) {
    await Business.deleteOne({id: photoID})
    res.status(204).end();
  } else {
    next();
  }
});
