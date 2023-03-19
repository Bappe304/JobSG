const JobListing = require('../models/JobListingModel')
const jwt = require('jsonwebtoken')

//create job listing
const createJobListing = async function (req,res){
    const {jobTitle, jobDescription, totalPay, startDateTime, endDateTime, postalCode, reqNumberOfWorkers} = req.body
    const creatorId = req.account._id
    let emptyFields = []
    if(!jobTitle) emptyFields.push('jobTitle')
    if(!jobDescription) emptyFields.push('jobDescription')
    if(!totalPay) emptyFields.push('totalPay')
    if(!startDateTime) emptyFields.push('startDateTime')
    if(!endDateTime) emptyFields.push('endDateTime')
    if(!postalCode) emptyFields.push('postalCode')
    if(!reqNumberOfWorkers) emptyFields.push('reqNumberOfWorkers')
    if(!creatorId) emptyFields.push('creatorId')
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all fields", emptyFields})
    }
    try{
        const jobListing = await JobListing.create({jobTitle, jobDescription, totalPay, startDateTime, endDateTime, postalCode, reqNumberOfWorkers, creatorId, workersId:[1,2,3]})
        
        res.status(200).json(jobListing)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {createJobListing}