const mongoose = require('mongoose')
const {JobApplicationObserver} = require('../observers/jobApplicationObserver')
const jobApplicationModel = require('../models/jobApplicationModel')


class getApplicationsByUserController extends JobApplicationObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleGetAllJobApplications = this.handleGetAllJobApplications.bind(this)
    }
    async update(req){
        let jobApplications = await jobApplicationModel.getAllJobsAppliedFor(req)
        return jobApplications
        
    }

    async handleGetAllJobApplications(req,res){
        try{
            const applications = await this.update(req)
            res.status(200).json(applications)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

module.exports = {getApplicationsByUserController}
