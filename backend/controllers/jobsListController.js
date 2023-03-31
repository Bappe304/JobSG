const mongoose = require('mongoose')
const JobListing = require('../models/JobListingModel')
const {JobListingObserver} = require('../observers/JobListingObserver')

//get specific job listing
class jobsListController extends JobListingObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleGetAllJobListings = this.handleGetAllJobListings.bind(this)
    }
    async update(req){
        const jobListings = await JobListing.getAllJobListings(req)
        return jobListings
    }

    async handleGetAllJobListings(req,res){
        try{
            const jobListings = await this.update(req)
            res.status(200).json(jobListings)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }

}

module.exports = {jobsListController}