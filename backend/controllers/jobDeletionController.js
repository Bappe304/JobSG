const JobListing = require('../models/JobListingModel')
const jwt = require('jsonwebtoken')

//delete job listing
const deleteJobListing = async function (req,res){
    const userId = req.account._id
    const {jobID} = req.body
    if(!userId) emptyFields.push('creatorId')
    if(!jobID) emptyFields.push('jobID')
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all fields", emptyFields})
    }
    if(!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(jobID)){
        return res.status(400).json({error:"Account / job does not exist"})
    }
    try{
        let jobListing = await JobListing.findById({_id:jobID})
        if (!jobListing) return res.status(400).json({error:"Job Listing does not exist"})
        if (jobListing.creatorId != userId) return res.status(400).json({error:"User is not authorised to do the following action"})   
        jobListing = await JobListing.findByIdAndDelete({_id:jobID})
        res.status(200).json(jobListing)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

const account = await Account.findByIdAndDelete({_id:id})
    if(!account){
        return res.status(400).json({error:"Account does not exist"})
    }
    res.status(200).json(account)
module.exports = {createJobListing}