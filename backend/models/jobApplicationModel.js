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
        type: String,
        required: true
    },
    applicationStatus: {
        type: String
    }

}, {timestamps: true})

module.exports = mongoose.model('JobApplication', jobAppSchema)
