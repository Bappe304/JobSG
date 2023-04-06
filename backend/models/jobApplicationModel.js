const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobApplicationSchema = new Schema({
    applicantID:{
        type: String,
        required: true
    },
    jobListingAppliedForID:{
        type: String,
        required: true

    },
    //Working period range
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        rewuired: true
    },
    relevantDocuments: {
        data: Buffer,
        contentType: String,
        required: false
    },
    applicationStatus: {
        type: String
    }

}, {timestamps: true})

//module.exports = mongoose.model('JobApplication', jobApplicationSchema)

jobApplicationSchema.statics.createJobApplication = async function(req){
    const {jobListingAppliedForID, startDateTime, endDateTime} = req.body
    const applicantID = req.account._id
    let emptyFields = []
    if(!jobListingAppliedForID) emptyFields.push('jobListingAppliedForID')
    if(!startDateTime) emptyFields.push('startDateTime')
    if(!endDateTime) emptyFields.push('endDateTime')
    if(!applicantID) emptyFields.push('applicantID')
    if(emptyFields.length > 0){
        throw Error("Please fill in all fields", emptyFields)
    }
    try{
        const jobApplication = await this.create({applicantID, jobListingAppliedForID, startDateTime, endDateTime, applicationStatus:"Pending"})
        return jobApplication
    }catch (error){
        throw Error(error.message)
    }
}

jobApplicationSchema.statics.getAllJobApplications = async function(req){
    const applicantID = req.account._id
    if(!mongoose.Types.ObjectId.isValid(applicantID)){
        throw Error("Account does not exist")
    }
    try{
        let jobApplications = await this.find()
        if(!jobApplications){
            throw Error("No job applications found")
        }
    }
}




jobApplicationSchema.statics.updatejobDetails = async function(req){
    const(applicantID) = req.account._id
    if(!mongoose.Types.ObjectId.isValid(applicantID)){
        throw Error("Account does not exist")
    }

    try{
        let jobApplication = await this,findById(jobApplicationID)
        if(!jobapplication)
        {
            res.status(404).json({error: "Job Application does not exist"})
        }

        const {firstName, lastName, emailAddress, phoneNumber, age, startDate, endDate, relevantDocuments} = req.body
        application.firstName = firstName
        application.lastName = lastName
        application.emailAddress = emailAddress
        application.phoneNumber = phoneNumber
        application.age = age
        application.startDate = startDate
        application.endDate = endDate

        const updatedJob = await application.save()
        res.status(200).json(updatedJob)

    }catch(error){
        console.error(error)
        res.status(500).json({message: 'Server Error'})
    }
}

module.exports = mongoose.model('JobApplication', jobApplicationSchema)