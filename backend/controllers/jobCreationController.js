const JobListing = require('../models/JobListingModel')
const {JobListingObserver} = require('../observers/JobListingObserver')
const {getJobLocation} = require('../controllers/apiController')


//create job listing

class jobCreationController extends JobListingObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleJobCreation = this.handleJobCreation.bind(this)
        
    }
    async update(req){
        const jobListing = await JobListing.createJob(req)
        return jobListing
    }

    async handleJobCreation(req,res){
        try{
            //checking user input
            const {jobTitle, jobDescription, totalPay, startDateTime, endDateTime, postalCode, reqNumberOfWorkers} = req.body
            const emptyFields = []
            if(!jobTitle) emptyFields.push('jobTitle')
            if(!jobDescription) emptyFields.push('jobDescription')
            if(!totalPay) emptyFields.push('totalPay')
            if(!startDateTime) emptyFields.push('startDateTime')
            if(!endDateTime) emptyFields.push('endDateTime')
            if(!postalCode) emptyFields.push('postalCode')
            if(!reqNumberOfWorkers) emptyFields.push('reqNumberOfWorkers')
            if(emptyFields.length > 0){
                throw Error("Please fill in all fields: " + emptyFields)
            }
            const addrInfo = await getJobLocation(req.body["postalCode"])
            req.body["address"] = addrInfo["address"]
            req.body["lat"] = addrInfo["latitude"]
            req.body["lng"] = addrInfo["longitude"]
            const jobListing = await this.update(req)
            res.status(200).json(jobListing)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }

}

module.exports = {jobCreationController}

/*
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
*/