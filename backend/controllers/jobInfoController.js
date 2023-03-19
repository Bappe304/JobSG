const mongoose = require('mongoose')
const JobListing = require('../models/JobListingModel')
const jwt = require('jsonwebtoken')

//get specific job listing
const getJobListingByID = async function (req,res){
    const {jobListingID} = req.params
    if(!mongoose.Types.ObjectId.isValid(jobListingID)){
        return res.status(400).json({error:"Job listing does not exist"})
    }
    let jobListing = await JobListing.findById(jobListingID)
    if(!jobListing){
        return res.status(400).json({error:"Job Listing does not exist"})
    }
    res.status(200).json(jobListing)
}

//get all job listings
const getAllJobListings = async function (req,res){
    let jobListing = await JobListing.find()
    if(!jobListing){
        return res.status(400).json({error:"Job Listing does not exist"})
    }
    res.status(200).json(jobListing)
}

module.exports = {getJobListingByID, getAllJobListings}