const AddJob = require('../models/jobApplicationModel')
const mongoose = require('mongoose')
const {jobApplicationObserver} = require('../observers/jobApplicationObserver')

class CreatejobApplicationController extends jobApplicationObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleJobApplication = this.handleJobApplication.bind(this)
    }
    async update(req){
        const job = await AddJob.createJobApplication(req)
        return job
    }

    async handleJobApplication(req,res){
        try{
            const job = await this.update(req)
            res.status(200).json(job)
        }catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

module.exports = {CreatejobApplicationController}




