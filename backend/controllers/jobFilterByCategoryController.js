const mongoose = require('mongoose')
const JobListing = require('../models/JobListingModel')
const jwt = require('jsonwebtoken')
const {jobListingObserver} = require('../observers/JobListingObserver')

class filterbyCategoryController extends jobListingObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
    }
    async update(req){
        const job = await JobListing.filterByCategory(req)
        return job
    }

    async handleFilter(req,res){
        try{
            const job = await this.update(req)
            res.status(200).json(job)
        }catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

module.exports = {filterbyCategoryController}