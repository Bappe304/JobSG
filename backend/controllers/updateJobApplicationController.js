const updateJob = require('../models/jobApplicationModel')
const mongoose = require('mongoose')
const {jobApplicationObserver} = require('../observers/jobApplicationObserver')


class updateJobApplicationController extends jobApplicationObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleJobApplicationUpdate = this.handleJobApplicationUpdate.bind(this)

    }
    async update(req){
        const job = await updateJob.updateJobDetails(req)
        return job
    }

    async handleJobApplicationUpdate(req,res){
        try{
            const job = await this.update(req)
            res.status(200).json(job)
        } catch(error){
            res.status(400).json({error:error.message})
        }
}

}

module.exports = {updateJobApplicationController}