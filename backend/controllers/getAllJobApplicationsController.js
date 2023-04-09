const mongoose = require('mongoose')
const {JobApplicationObserver} = require('../observers/jobApplicationObserver')
const jobApplicationModel = require('../models/jobApplicationModel')
const JobListing = require('../models/JobListingModel')
const Account = require('../models/AccountModel')


class getAllJobApplicationsController extends JobApplicationObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleGetAllJobApplications = this.handleGetAllJobApplications.bind(this)
    }
    async update(req){
        const userID = req.account._id
        const allJobsCreatedByUser = await JobListing.getAllJobListingsByCreatorID(userID)

        let allApplications = []
        let jobApplications = {}
        for (let i = 0; i < allJobsCreatedByUser.length; i++){
            jobApplications = await jobApplicationModel.getAllApplicationsForJob(allJobsCreatedByUser[i]["_id"])
            if (jobApplications == {}){
                continue
            }
            allApplications.push(...jobApplications)
        }

        return allApplications;
        
    }

    async handleGetAllJobApplications(req,res){
        try{
            const applicants = await this.update(req)
            res.status(200).json(applicants)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

module.exports = {getAllJobApplicationsController}
