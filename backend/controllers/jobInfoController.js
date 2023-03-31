const mongoose = require('mongoose')
const JobListing = require('../models/JobListingModel')
const Account = require('../models/AccountModel')
const {JobListingObserver} = require('../observers/JobListingObserver')
const {getJobLocation} = require('../controllers/apiController')

//get specific job listing
class jobInfoController extends JobListingObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleGetJobListingByID = this.handleGetJobListingByID.bind(this)
    }
    async update(req){
        const jobListing = await JobListing.getJobListingByID(req)
        let updatedJobListing = JSON.parse(JSON.stringify(jobListing))
        let creatorID = updatedJobListing["creatorId"]
        //fetch name from creator
        updatedJobListing["creatorName"] = await Account.getName(creatorID)
        return updatedJobListing
    }
    async handleGetJobListingByID (req,res){
        try{
            const jobListing = await this.update(req)
            res.status(200).json(jobListing)
        } catch(error){
            res.status(400).json({error:error.message})
        }
        
    }
    /*
    async handleGetAllJobListings (req,res){
        try{
            const jobListing = await JobListing.getAllJobListings(req)
            res.status(200).json(jobListing)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }
    */

}

module.exports = {jobInfoController}