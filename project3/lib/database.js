// import mongoose from 'mongoose';

const router = require('express').Router();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 5;

main().catch(err => console.log(err)); //probably shouldn't be main?

async function main() { //probably shouldn't be main?
  //await mongoose.connect('mongodb://127.0.0.1:27017/test');
  await mongoose.connect('mongodb://root:hunter2@localhost:27017');
  //await mongoose.connect(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:27017`); //Enviroment Variables
}

const mongooseBusinessSchema = new mongoose.Schema({
  ownerid: Number,
  name: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  category: String,
  subcategory: Array, //is this right?
  website: String,
  email: String
});

const mongooseReviewSchema = new mongoose.Schema({
  userid: Number,
  businessid: Number,
  dollars: Number,
  stars: Number,
  review: String
});

const mongoosePhotoSchema = new mongoose.Schema({
  userid: Number,
  businessid: Number,
  caption: String
});

const mongooseUserSchema = new mongoose.Schema({
  email: { type: String, required: true, index: { unique: true }}, //User's email address (which must be unique among all users)
  password: { type: String, required: true }, //User's hashed/salted password
  admin: { type: String, required: false } //A boolean flag indicating whether the user has administrative permissions (false by default)
})

// User validation moved onto schema function
// 'save' vs save?
mongooseUserSchema.pre('save', function (next) {
  var user = this;
  console.log("in user schema")
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      console.log(hash);
      next();
    });
  });


});

mongooseUserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};



//Models to attach documents to

const Business = mongoose.model('Business', mongooseBusinessSchema);
const Review = mongoose.model('Review', mongooseReviewSchema);
const Photo = mongoose.model('Photo', mongoosePhotoSchema);
const User = mongoose.model('User', mongooseUserSchema)


//Is this how you export to different functions?
exports.Business = Business;
exports.Review = Review;
exports.Photo = Photo;
exports.User = User;

exports.getBusiness = getBusiness;



//helper functions for database:

async function getBusiness(id) {
  if ((result = await Business.countDocuments({ ownerid: id }).count().exec()) > 0) {
    console.log("reaches inside getBusiness")
    const businessCombined = {
      businessResult: await Business.find({ ownerid: id }),
      reviewResult: await Review.find({ businessid: id }),
      photoResult: await Photo.find({ businessid: id }),
    }
    return businessCombined
  }
  return null
}

