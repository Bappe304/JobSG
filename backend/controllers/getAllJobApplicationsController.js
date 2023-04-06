const mongoose = require('mongoose')
const {JobApplicationObserver} = require('../observers/jobApplicationObserver')
const getAllJobs = require('../models/jobApplicationModel')

class getAllJobApplicationsController extends JobApplicationObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleGetAllJobApplications = this.handleGetAllJobApplications.bind(this)
    }
    async update(req){
        const job = await getAllJobs.getAllJobApplications(req)
        return job
    }

    async handleGetAllJobApplications(req,res){
        try{
            const job = await this.update(req)
            res.status(200).json(job)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

module.exports = {getAllJobApplicationsController}