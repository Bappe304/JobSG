const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobListSchema = new  Schema({
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
    startDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: Time,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    endTime: {
        type: Time,
        required: true
    },
    jobLocation: {
        
    },
    numberofWorkers: {
        type: Number,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('JobListing', jobListSchema)