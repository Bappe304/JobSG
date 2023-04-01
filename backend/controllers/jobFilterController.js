const mongoose = require('mongoose')
const JobListing = require('../models/JobListingModel')
const jwt = require('jsonwebtoken')

//Filter by Category
const filterbyCategory = async function(req,res) {
    try{
    const {category} = req.query
    const jobs = await JobListing.find({Category: category})
    res.status(200).json(jobs)
    }catch (err){
        res.status(500).json({ error: err.message})
    }
}


//Filter by Start & End date
const filterbyDate = async function(req,res) {
    try{
        const {startDate, endDate} = req.query

        //find all jobs with start date >= startDate and end date <= endDate
        const jobs = await Job.find({
            $and: [
                {startDate: { $gte: new Date(startDate)}},
                {enddate: { $lte: new Date(endDate)}}
            ]
        })
        res.status(200).json(jobs);
    }catch(err)
    {
        res.status(500).json({error: err.message})
    }
}


//Filter by Location
const filterbyLocation = async function(req,res) {
    try{
        const {pinpoint} = req.query
        const location = await JobListing.find({postalCode: pinpoint})
        res.status(200).json(location)

    }catch(err){
        res.status(500).json({error: err.message})
    }
}


module.exports = (filterbyCategory, filterbyDate, filterbyLocation)