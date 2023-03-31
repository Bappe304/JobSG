const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobListingSchema = new Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    totalPay: {
        type: String,
        required: true
    },
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime:{
        type: Date,
        required: true
    },

    postalCode: {
        type: Number,
        required: true
        
    },
    reqNumberOfWorkers: {
        type: Number,
        required: true
    },
    creatorId:{
        type: String,
        required: true
    },
    workersId:{
        type: Array,
        
    },
    category: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    lat:{
        type: String,
        required: true
    },
    lng:{
        type: String,
        required: true
    }



}, {timestamps: true})


jobListingSchema.statics.createJob = async function(req){
    const {jobTitle, jobDescription, totalPay, startDateTime, endDateTime, postalCode, reqNumberOfWorkers, category,address,lat,lng} = req.body
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
    if(!creatorId) emptyFields.push('address')
    if(!creatorId) emptyFields.push('lat')
    if(!creatorId) emptyFields.push('lng')
    if(emptyFields.length > 0){
        throw Error("Please fill in all fields", emptyFields)
    }
    const jobListing = await this.create({jobTitle, jobDescription, totalPay, startDateTime, endDateTime, postalCode, reqNumberOfWorkers, creatorId, workersId:[], category,address,lat,lng})
    return jobListing
}

jobListingSchema.statics.getJobListingByID = async function(req){
    const {jobListingID} = req.params
    if(!mongoose.Types.ObjectId.isValid(jobListingID)){
        throw Error("Job listing does not exist")
    }
    let jobListing = await this.findById(jobListingID)
    if(!jobListing){
        throw Error("Job Listing does not exist")
    }
    return jobListing
}


jobListingSchema.statics.getAllJobListings = async function (req){
    let jobListings = this.find()
    if(!jobListings){
        throw Error("No Job Listings Exists")
    }
    return jobListings
}



module.exports = mongoose.model('JobListing', jobListingSchema)

