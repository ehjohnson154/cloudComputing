// import mongoose from 'mongoose';

const router = require('express').Router();

const mongoose = require('mongoose');

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


  //Models to attach documents to

const Business = mongoose.model('Business', mongooseBusinessSchema);
const Review = mongoose.model('Review', mongooseReviewSchema);
const Photo = mongoose.model('Photo', mongoosePhotoSchema);


//Is this how you export to different functions?
exports.Business = Business;
exports.Review = Review;
exports.Photo = Photo;

exports.getBusiness = getBusiness;



  //helper functions for database:

async function getBusiness(id){
    if ((result = await Business.countDocuments({ownerid: id }).count().exec()) > 0){
        console.log("reaches inside getBusiness")
        const businessCombined = {
            businessResult: await Business.find({ownerid: id}),
            reviewResult: await Review.find({businessid: id}),
            photoResult: await Photo.find({businessid: id}),
        }
        return businessCombined
    }
    return null
}

